import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./header.css";
import "./content.css";
import "./article.css";

const validate = (values) => {
  const errors = {};
  if(!values.search){
    errors.search = "the field cannot be empty"
  }
  return errors
}


function Header() {
  const [photos, setPhotos] = useState([]);
  console.log({ photos });
  const open = (url) => window.open(url);
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          validate={validate}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID 0CODNVf7Dy2lq1FngT_tYbXCrc-txrGLnwZe8yg87no",
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
            <button type="submit" className="button-search">
              search
            </button>
            <br/>
            <ErrorMessage name="search"/>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>  
      </div>
    </div>
  );
}

export default Header;
