import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"

const hiden_from = () => (
  <div className="accordion accordion-flush" id="accordionFlushExample">
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingOne">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          Accordion Item #1
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          Placeholder content for this accordion, which is intended to
          demonstrate the <code>.accordion-flush</code> class. This is the first
          item's accordion body.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingTwo">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          Accordion Item #2
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingTwo"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          Placeholder content for this accordion, which is intended to
          demonstrate the <code>.accordion-flush</code> class. This is the
          second item's accordion body. Let's imagine this being filled with
          some actual content.
        </div>
      </div>
    </div>
    <div className="accordion-item">
      <h2 className="accordion-header" id="flush-headingThree">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseThree"
          aria-expanded="false"
          aria-controls="flush-collapseThree"
        >
          Accordion Item #3
        </button>
      </h2>
      <div
        id="flush-collapseThree"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingThree"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          Placeholder content for this accordion, which is intended to
          demonstrate the <code>.accordion-flush</code> class. This is the third
          item's accordion body. Nothing more exciting happening here in terms
          of content, but just filling up the space to make it look, at least at
          first glance, a bit more representative of how this would look in a
          real-world application.
        </div>
      </div>
    </div>
  </div>
)

type PopupProps = {
  tab: string
}

function Popup({ tab }: PopupProps) {
  return (
    <div>
      <h1>Chrome Extension - {tab}</h1>
      <form className="g-3">{hiden_from()}</form>
    </div>
  )
}

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log("rendered")
  }, [])

  return <Popup tab="home" />
}

const container = document.getElementById("react-target") as HTMLElement
const root = createRoot(container)
root.render(<AppWithCallbackAfterRender />)
