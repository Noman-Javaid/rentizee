import React from 'react'
import {Link} from 'react-router-dom';

export const Footer = () => {
    return (
        <div>
                      <footer className="py-4 mt-auto text-lowercase">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-success">Copyright &copy; <Link className="text-success" to="../">Rentizee.com</Link></div>
                            <div className="text-success">
                                <Link className="text-success" to="#">Privacy Policy</Link>
                                &middot;
                                <Link className="text-success" to="#">Terms &amp; Conditions</Link>
                            </div>
                        </div>
                    </div>
                </footer>
        </div>
    )
}
export default Footer;
