# API Specifications

# User:
Authentication | Type | Path | Description |
|--|--|--|--|
\- | POST | /driver/add | Add new driver details. If present log in. |
\- | POST | /book | Check-in |
\- | PUT | /book | Confirm pre-booking |
\- | DEL | /book/\<code\> | Checkout |
\- | GET | /slot | Get available slot for pre-booking |


# Admin:
Authentication | Type | Path | Description |
|--|--|--|--|
TOKEN | POST |  /user/login | Log in for admin.
TOKEN | POST | /slots/\<num\> | Generate given amounts of slots.
TOKEN | DEL | /slots/\<code\> | Delete slot with given code.
TOKEN | GET | /slots | Get all data