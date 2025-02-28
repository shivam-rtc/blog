import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-gray-300">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300">
                  Instructors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Teach</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-gray-300">
                  Become an Instructor
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300">
                  Teaching Academy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-gray-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-gray-300">
                <FaFacebook size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <FaTwitter size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <FaInstagram size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()}  Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer