import * as React from "react"
import "./Footer.css"

export default function Footer() {
    return (
        <nav className="footer">
            <div className="info">
                <div className="about-us">
                    <h4>About Us: </h4>
                    <p>At Exploreio, we are passionate about making your travel dreams a reality. We are not just another travel app – we are your ultimate companion on a global adventure. Our mission is to ignite your wanderlust and connect you with captivating destinations around the world.</p>
                    <p>Travel is about more than just sightseeing – it's about immersing yourself in different cultures, embracing diversity, and creating unforgettable memories. Whether you're yearning for breathtaking landscapes, iconic landmarks, or hidden gems off the beaten path, we are here to guide you every step of the way.</p>
                </div>
                <div className="contact-us">
                    <h4>Contact Us:</h4>
                    <p>We value your feedback, inquiries, and suggestions. Feel free to reach out to us with any questions or comments you may have. Our dedicated support team is here to assist you on your travel journey.</p>
                    <div className="namesandemails">
                        <div className="names">
                            <p>Abbas Islaw</p>
                            <p>Dina Cazun-Moreno</p>
                            <p>Emanda Seifu</p>
                        </div>

                        <div className="emails">
                            <p>abbas.islaw.site@codepath.org</p>
                            <p>dina.cazun-moreno.site@codepath.org</p>
                            <p>emanda.seifu.site@codepath.org</p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
