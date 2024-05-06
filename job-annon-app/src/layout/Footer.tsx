import { Link } from "react-router-dom";
import logo from "/src/assets/logo_w.png";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-gray-900 text-white  p-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-5 gap-1">
        <div>
          <h5 className="font-bold mb-4">
            <img src={logo} alt="logo" className="w-20" />
          </h5>
          <p>
            <a href="mailto:info@findyourjob.com">E-mail us</a>
          </p>
          <p>info@findyourjob.com</p>
          <p>
            <a href="tel:+48888888888">Call us</a>
          </p>
          <p>+48 888 888 888</p>
        </div>
          <div className="flex flex-col m-5 border-l-2 border-gray-800 pl-5">
            <h5 className="font-bold mb-4">Find Your Job</h5>
            <Link to="/about">About us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/events">Events</Link>
            <Link to="/gdpr">GDPR</Link>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms">Terms and conditions</Link>
            <Link to="/cookies">Cookie settings</Link>
            <Link to="/dsa">Digital Services Act (DSA)</Link>
          </div>
          <div className="flex flex-col m-5 border-l-2 border-gray-800 pl-5">
            <h5 className="font-bold mb-4">Candidates</h5>
            <Link to="/job-offers">Job offers</Link>
            <Link to="/companies">Companies</Link>
            <Link to="/my-profile">My profile</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/subscribe">Subscribe offers</Link>
            <Link to="/ambassador">Ambassador program</Link>
          </div>
          <div className="flex flex-col m-5 border-l-2 border-gray-800 pl-5">
            <h5 className="font-bold mb-4">Employers</h5>
            <Link to="/start-hiring">Start hiring</Link>
            <Link to="/clients">Our clients</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/insights">NFJ Insights</Link>
            <Link to="/post-job">Post a job</Link>
            <Link to="/job-format">Job ad format</Link>
            <Link to="/hr-community">HR in IT community</Link>
            <Link to="/investors">Investors database</Link>
          </div>
          <div className="flex flex-col m-5 border-l-2 border-gray-800 pl-5">
            <h5 className="font-bold mb-4">Stay in touch</h5>
            <a href="https://www.facebook.com">Facebook</a>
            <a href="https://www.linkedin.com">LinkedIn</a>
            <a href="https://www.instagram.com">Instagram</a>
            <a href="https://www.youtube.com">YouTube</a>
            <a href="https://www.twitter.com">Twitter</a>
            <a href="https://www.tiktok.com">TikTok</a>
            <a href="https://www.pinterest.com">Pinterest</a>
          </div>
        </div>
    </footer>
  );
}
