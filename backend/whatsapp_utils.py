import os
from twilio.rest import Client
from dotenv import load_dotenv

#print("SID:", os.getenv("TWILIO_ACCOUNT_SID"))
#print("TOKEN:", os.getenv("TWILIO_AUTH_TOKEN"))
#print("FROM:", os.getenv("TWILIO_WHATSAPP_NUMBER"))

load_dotenv()

def send_whatsapp_message(to_number, message):
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_WHATSAPP_NUMBER")
    if not (account_sid and auth_token and from_number):
        print("Twilio credentials not set.")
        return
    client = Client(account_sid, auth_token)
    try:
        client.messages.create(
            body=message,
            from_=f"whatsapp:{from_number}",
            to=f"whatsapp:{to_number}"
        )
    except Exception as e:
        print("Failed to send WhatsApp message:", e) 