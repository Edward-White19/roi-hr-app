# ROI HR Database Endpoints

This document details the data structures contained within the database, as read and written by the API.

---

## API Anatomy

`/api/departments/`

```javascript
{
    "id": 1,
    "name": "General"
}
```

`/api/people/`

```javascript
{
    "id": 1,
    "name": "John Smith",
    "phone": "02 9988 2211",
    "street": "1001 Code Lane",
    "city": "Javaville",
    "state": "NSW",
    "zip": "0100",
    "country": "Australia",
    "departmentId": 1,
    "Department": {
      "id": 1,
      "name": "General"
    }
}
```

---

## Credits

| **Author**     | **Roles/Resources**                                   |
| -------------- | ----------------------------------------------------- |
| Edward White   | Information compilation, document structure.          |
| Jalal Alhaddad | Server and database development, API anatomy details. |
