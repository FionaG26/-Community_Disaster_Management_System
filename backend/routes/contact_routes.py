from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import logging
import psycopg2
from psycopg2 import sql

# Configure logger
logger = logging.getLogger(__name__)

# Define the Contact form data model
class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

# Database connection (update with your database credentials)
def get_db_connection():
    conn = psycopg2.connect(
        dbname="your_db_name",
        user="your_db_user",
        password="your_db_password",
        host="your_db_host",
        port="your_db_port"
    )
    return conn

# Create a router for contact-related endpoints
router = APIRouter()

# Email sending function
def send_email(contact: ContactRequest):
    try:
        sender_email = "your_email@example.com"
        recipient_email = "admin@example.com"
        subject = f"Contact Form Submission from {contact.name}"
        body = f"Name: {contact.name}\nEmail: {contact.email}\nMessage: {contact.message}"

        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))

        # Using SMTP to send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, 'your_email_password')
            server.sendmail(sender_email, recipient_email, msg.as_string())
            logger.info(f"Contact form email sent successfully to {recipient_email}")
    except Exception as e:
        logger.error(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")

# Store contact message in the database
def store_contact_message(contact: ContactRequest):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        insert_query = sql.SQL("""
            INSERT INTO contact_messages (name, email, message, created_at)
            VALUES (%s, %s, %s, %s)
        """)
        cursor.execute(insert_query, (contact.name, contact.email, contact.message, datetime.now()))
        conn.commit()
        cursor.close()
        conn.close()
        logger.info(f"Contact form message from {contact.name} stored successfully")
    except Exception as e:
        logger.error(f"Error storing contact message: {e}")
        raise HTTPException(status_code=500, detail="Failed to store contact message in database")

# Route to handle the contact form submission
@router.post("/contact")
async def submit_contact_form(contact: ContactRequest):
    logger.info(f"Received contact form submission: {contact.name}, {contact.email}")

    # Perform basic validation
    if not contact.name or not contact.email or not contact.message:
        raise HTTPException(status_code=400, detail="All fields are required.")

    # Send the message by email
    send_email(contact)

    # Store the message in the database
    store_contact_message(contact)

    # Return a success response
    return {"message": "Message sent successfully!"}
