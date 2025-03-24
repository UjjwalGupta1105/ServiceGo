import { MDBFooter, MDBContainer, MDBRow, MDBCol,MDBIcon } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

const Footer=()=>{
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
      <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href='https://github.com/UjjwalGupta1105' className='me-4 text-reset'>
            <GitHubIcon />
          </a>
          <a href='https://www.linkedin.com/in/ujjwal-gupta-b05130289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' className='me-4 text-reset'>
            <LinkedInIcon />
          </a>
          <a href='mailto:ujjwalgupta0506@gmail.com' className='me-4 text-reset'>
            <EmailIcon/>
          </a>
          <a href='' className='me-4 text-reset'>
            <InstagramIcon />
          </a>
          <a href='' className='me-4 text-reset'>
            <CallIcon/>
          </a>
          <a href='https://github.com/UjjwalGupta1105' className='me-4 text-reset'>
            <XIcon />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Service Go
              </h6>
              <p>
              ServiceGo connects you with top-rated professionals for all your home service needs. We bring expert services right to your doorstep. With easy booking, transparent pricing, and trusted professionals, ServiceGo makes home maintenance hassle-free and convenient.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#' className='text-reset text-decoration-none'>
                  Home
                </a>
              </p>
              <p>
                <a href='/Services/all-services' className='text-reset text-decoration-none'>
                 Services
                </a>
              </p>
              <p>
                <a href='/contact' className='text-reset text-decoration-none'>
                  Contact
                </a>
              </p>
              <p>
                <a href='/about' className='text-reset text-decoration-none'>
                  About
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="2" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
               MMMUT , Gorakhpur
              </p>
              <p>
                ujjwalgupta0506@gmail.com
              </p>
              <p> +91 6393295514
              </p>
              <p>
               6393295514
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Wanna Join Service Go ??</h6>
              <p>Are you a skilled professional looking for more job opportunities? Contact us through the Contact Page to get started today! 🚀</p>
              {/* <p>📩 Interested? Contact us through the Contact Page to get started today! 🚀</p> */}
              {/* <p>
                <a href='#!' className='text-reset text-decoration-none'>
                  React.js
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-decoration-none'>
                  Node.js
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-decoration-none'>
                  Express.js
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset text-decoration-none'>
                  MongoDB
                </a>
              </p> */}
            </MDBCol>

          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
}

export default Footer;