"use client"

import type React from "react"
import styles from "./Conferences.module.css"

const Conferences: React.FC = () => {
  const conferenceList = [
    {
      title: "Nordic Pelvic Floor Conference 2024",
      date: "15–17 March 2024",
      location: "Oslo, Norway",
      description: "Annual conference for healthcare professionals working with pelvic floor health",
      featured: true,
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>
            <img src="/mdi_events.png" alt="" />
          </span>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Conferences and events</h2>
          <p className={styles.subtitle}>Stay updated on the latest developments in pelvic floor health</p>
        </div>
      </div>

      <div className={styles.conferencesList}>
        {conferenceList.map((conference, index) => (
          <div key={index} className={`${styles.conferenceItem} ${conference.featured ? styles.featured : ""}`}>
            {conference.featured && (
              <button className={styles.learnMoreBtn}>
                <span className={styles.learnMoreIcon}>🔗</span>
                Learn more
              </button>
            )}
            <div className={styles.conferenceIcon}>
              <img src="/mdi_event-star.png" alt="" />
            </div>
            <div className={styles.conferenceInfo}>
              <h3 className={styles.conferenceTitle}>{conference.title}</h3>
              <div className={styles.conferenceDetails}>
                <div className={styles.conferenceDate}>
                  <span className={styles.dateIcon}>📅</span>
                  {conference.date}
                </div>
                <div className={styles.conferenceLocation}>
                  <span className={styles.locationIcon}>📍</span>
                  {conference.location}
                </div>
              </div>
              {conference.description && <p className={styles.conferenceDescription}>{conference.description}</p>}
            </div>
            {!conference.featured && (
              <button className={styles.linkBtn} title="View details">
                <span className={styles.linkIcon}>
                  <img src="/streamline-color_expand-window-2.png" alt="" />
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Conferences
