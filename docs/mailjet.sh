curl -s \
    -X POST \
    --user "71f86b1f6abfa58368ee279fb66f2ea5:c58f9f720497a2d3ed1bf5585facbd91" \
    https://api.mailjet.com/v3.1/send \
    -H "Content-Type: application/json" \
    -d '{
        "Messages":[
                {
                        "From": {
                                "Email": "beconnectedtechnologies@gmail.com",
                                "Name": "Me"
                        },
                        "To": [
                                {
                                        "Email": "rupertdguzman@gmail.com",
                                        "Name": "Rupert"
                                }
                        ],
                        "Subject": "My first Mailjet Email!",
                        "TextPart": "Greetings from Mailjet."
                }
        ]
    }'
