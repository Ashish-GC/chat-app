import React from 'react'
import classes from "./settings.module.css"

function page() {
  return (
    <section className={classes.container}>
             manage settings -
          <p>add profile image</p>
          <p>add description</p>
          <p>block a contact</p>
    </section>
  )
}

export default page
