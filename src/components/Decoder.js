import React, { useState, useEffect } from 'react';

function Decoder() {
  const [jwt, setJwt] = useState('');
  const [header, setHeader] = useState('');
  const [body, setBody] = useState('');
  const [sig, setSig] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwtParam = urlParams.get('jwt');

    if (jwtParam) {
      setJwt(jwtParam);
      parseJWT(jwtParam);
    }
  }, []);

  const parseJWT = (jwt) => {
    // Clean out whitespace
    jwt = jwt.replace(/\n/g, '');
    jwt = jwt.replace(/\ /g, '');

    // Split and display token components
    jwt = jwt.split('.');

    try {
      setHeader(JSON.stringify(JSON.parse(atob(jwt[0])), null, 2));
    } catch (err) {
      setHeader(`The Header is not properly encoded\n\n${err}`);
    }

    try {
      setBody(JSON.stringify(JSON.parse(atob(jwt[1])), null, 2));
    } catch (err) {
      setBody(`The Body is not properly encoded\n\n${err}`);
    }

    setSig(jwt[2]);
  };

  return (
    <div>
      <h1>Simple JWT decoder</h1>
      <p>
        A very simple JavaScript that takes a JWT, splits it into the three components, decodes them, and displays the decoded components in textareas. Note that this does not perform signature verification at this time.
      </p>
      <div className='parent'>
        <div className='child'>
          <h5>JWT</h5>
          <textarea
            id="jwt"
            onChange={(e) => {
              setJwt(e.target.value);
              parseJWT(e.target.value);
            }}
            value={jwt}
            style={{ width: '500px', height: '500px' }}
          />
        </div>
        <div className='child'>
          <h5>Decoded Token</h5>
          <p>Header:</p>
          <textarea id="header" style={{ width: '500px' }} value={header} readOnly />
          <p>Body</p>
          <textarea id="body" style={{ width: '500px' }} value={body} readOnly />
          <p>Signature</p>
          <textarea id="sig" style={{ width: '500px' }} value={sig} readOnly />
        </div>
      </div>
      <hr />
      <div id="explainations">
        <p>
          <b>Header:</b> Tells you what kind of encoding was used and what kind of token we're looking at (which in real life will always be JWT)
        </p>
        <p>
          <b>Body:</b> This is the main data with claims, scopes, and other details that are consumed by the security plane
        </p>
        <p>
          <b>Signature:</b> The Signature string can be verified using the
        </p>
      </div>
    </div>
  );
}

export default Decoder;
