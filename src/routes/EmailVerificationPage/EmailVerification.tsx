import { useEffect, useState } from 'react';
import './EmailVerification.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EmailVerification() {
     const { token } = useParams();
     const [verified, setVerified] = useState({
          started: false,
          verified: false,
     });

     useEffect(() => {
          console.log(token);
          const serverLink = import.meta.env.VITE_SERVER_LINK;
          setVerified({
               started: true,
               verified: false,
          });
          axios.get(`${serverLink}/verification/${token}`)
               .then((response) => {
                    if (response.status === 200) {
                         setVerified({
                              started: false,
                              verified: true,
                         });
                         console.log('Success');
                    } else {
                         setVerified({
                              started: false,
                              verified: false,
                         });
                    }
               })
               .catch((error) => {
                    console.log(error);
               });
     }, []);

     return (
          <div>
               {verified.verified && 'Email is verified, you can now activate email notifications on subscriptions!'}
          </div>
     );
}
