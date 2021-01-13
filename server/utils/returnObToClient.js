const alertMSG = (result, error, status) => {
    if (status == 1) {
        return {
            status: status,
            message: "הכל תקין",
            error: error,
            data: result
        }
    }
    else if (status == 0) {
        return {
            status: status,
            message: "התקבלה שגיאה בשרת",
            error: error,
            data: result
        }
    }
    else if (status == 2) {
        return {
            status: status,
            message: "מייל קיים במערכת",
            error: error,
            data: result
        }
    }
    else if (status == 3) {
        return {
            status: status,
            message: "תז קיימת במערכת",
            error: error,
            data: result
        }
    }

}

module.exports = alertMSG;