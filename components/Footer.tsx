import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="foot" id="about">
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="mark">
              K<b>A</b>C
            </div>
            <p className="brand-copy">
              Building a healthier, stronger and more connected Kolkata — one
              step at a time.
            </p>
          </div>
          <div>
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About KAC</a>
              </li>
              <li>
                <a href="#offer">Our Programs</a>
              </li>
              <li>
                <a href="#ai">AI Wellness</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Programs</h5>
            <ul>
              <li>
                <a href="#offer">Community Programs</a>
              </li>
              <li>
                <a href="#offer">Corporate Wellness</a>
              </li>
              <li>
                <a href="#offer">Sports &amp; Performance</a>
              </li>
              <li>
                <a href="#ai">AI-Powered Wellness</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Contact Us</h5>
            <ul className="contact">
              <li>
                <span className="ic">
                  <Phone strokeWidth={2} />
                </span>
                +91 8105060097
              </li>
              <li>
                <span className="ic">
                  <Mail strokeWidth={2} />
                </span>
                kolkataathleticcommunity@gmail.com
              </li>
              <li>
                <span className="ic">
                  <MapPin strokeWidth={2} />
                </span>
                Kolkata, West Bengal, India
              </li>
            </ul>
          </div>
        </div>
        <div className="bar">
          <span>© 2025 Kolkata Athletic Community. All Rights Reserved.</span>
          <span>Designed with Claude · Privacy Policy · Terms &amp; Conditions</span>
        </div>
      </div>
    </footer>
  );
}
