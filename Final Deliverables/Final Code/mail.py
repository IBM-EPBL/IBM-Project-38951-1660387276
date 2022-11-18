from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

API_KEY = 'Your API key here'


def sendgrid_email(subject, content, receiver):
    message = Mail(from_email='from@example.com',
                   to_emails=receiver,
                   subject=subject,
                   plain_text_content=content)
    sg = SendGridAPIClient(API_KEY)
    response = sg.send(message)
    print(response.status_code, response.body)


def main():
    SUBJECT = ''
    CONTENT = ''
    RECEIVER = ''

    sendgrid_email(SUBJECT, CONTENT, RECEIVER)


if __name__ == '__main__':
    main()
