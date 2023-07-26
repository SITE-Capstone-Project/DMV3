const {BadRequestError, UnauthorizedError} = require("../utils/errors")
const {BCRYPT_WORK_FACTOR} = require("../config/config")
const {SECRET_KEY} = require("../config/config")
const jwt = require("jsonwebtoken")
const db = require("../config/database")
const bcrypt = require("bcrypt")

class User {

    /* Returning a user's basic information */
    static async makeUser(user) {
        return ({
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        })
    }

    /* Logging in the user if the user exists and the credentials are matching. */
    static async login(credentials) {
        const requiredFields = ["email", "password"]

        requiredFields.forEach((element) => {
            if (!credentials.hasOwnProperty(element)) {
                throw new BadRequestError("Missing required fields")
            }
        })

        const existingUser = await User.fetchUserByEmail(credentials.email)

        if (existingUser) {
            const validPass = await bcrypt.compare(credentials.password, existingUser.password)
            if (validPass) {
                return User.makeUser(existingUser)
            }
        }

        throw new UnauthorizedError()
    }

    /* Registers a user if the user doesn't already exist */
    static async register(credentials) {
        const requiredFields = ["username", "email", "password", "first_name", "last_name"]

        requiredFields.forEach((element) => {
            if (!credentials.hasOwnProperty(element)) {
                throw new BadRequestError("Missing required fields")
            }
        })

        const alreadyExists = await User.fetchUserByEmail(credentials.email)

        if (alreadyExists) {
            throw new BadRequestError("User already exists with that email")
        }

        const hashedPass = await bcrypt.hash(credentials.password, parseInt(BCRYPT_WORK_FACTOR))

        const query = "INSERT INTO users (first_name, last_name, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING *;"
        const {rows} = await db.query(query, [credentials.first_name, credentials.last_name, credentials.email, hashedPass, credentials.username])
        return rows ? rows[0]: undefined
    }

    /* Fetches user by email */
    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided.")
        }
        email = email.toLowerCase()
        const query = "SELECT * FROM users WHERE email = $1;"
        const {rows} = await db.query(query, [email])
        return rows ? rows[0]: undefined
    }

    /* Generating an authentication JWT token for the user */
    static async generateAuthToken(user) {
        const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1hr"})
        return token
    }

    /* Verifying the auth token, which will return the payload if successful */
    static async verifyAuth(token) {
        try {
            const result = jwt.verify(token, SECRET_KEY)
            return result
        } catch(err) {
            return null
        }
    }
}

module.exports = User
