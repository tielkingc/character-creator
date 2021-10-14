module.exports.validateRegisterInput = (
    username,
    password,
    confirmPasword
) => {
    const errors = {}
    console.log(password + confirmPasword)
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }

    if (password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPasword) {
        errors.confirmPasword = 'Passwords must match';
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {}

    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (password.trim() === '') {
        errors.password = 'Password must not be empty'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}