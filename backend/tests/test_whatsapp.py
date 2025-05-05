import unittest
from unittest.mock import patch, MagicMock
import os

# Import the function from your module
from your_module_name import send_whatsapp_message  

class TestWhatsAppMessage(unittest.TestCase):

    @patch('your_module_name.Client')  # Mock the Client class in the module
    def test_send_whatsapp_message_success(self, mock_client):
        # Arrange
        mock_instance = MagicMock()
        mock_client.return_value = mock_instance

        os.environ["TWILIO_ACCOUNT_SID"] = "test_sid"
        os.environ["TWILIO_AUTH_TOKEN"] = "test_token"
        os.environ["TWILIO_WHATSAPP_NUMBER"] = "test_number"

        # Act
        send_whatsapp_message("+1234567890", "Hello!")

        # Assert
        mock_instance.messages.create.assert_called_once_with(
            body="Hello!",
            from_="whatsapp:test_number",
            to="whatsapp:+1234567890"
        )

    @patch('your_module_name.Client')
    def test_send_whatsapp_message_missing_credentials(self, mock_client):
        # Arrange: clear environment variables
        os.environ.pop("TWILIO_ACCOUNT_SID", None)
        os.environ.pop("TWILIO_AUTH_TOKEN", None)
        os.environ.pop("TWILIO_WHATSAPP_NUMBER", None)

        # Act
        send_whatsapp_message("+1234567890", "Hello!")

        # Assert
        mock_client.assert_not_called()  # Should not attempt to send

    @patch('your_module_name.Client')
    def test_send_whatsapp_message_failure(self, mock_client):
        # Arrange
        mock_instance = MagicMock()
        mock_instance.messages.create.side_effect = Exception("Twilio error")
        mock_client.return_value = mock_instance

        os.environ["TWILIO_ACCOUNT_SID"] = "test_sid"
        os.environ["TWILIO_AUTH_TOKEN"] = "test_token"
        os.environ["TWILIO_WHATSAPP_NUMBER"] = "test_number"

        # Act
        send_whatsapp_message("+1234567890", "Hello!")

        # Assert
        mock_instance.messages.create.assert_called_once()

if __name__ == '__main__':
    unittest.main()
