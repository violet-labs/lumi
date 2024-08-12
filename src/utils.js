export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function phoneMask(phone) {
    phone = phone.replace(/\D+/g, '');
    const phoneLength = phone.length

    let phoneMask = null
    if (phoneLength <= 8)
        phoneMask = '####-#####'
    if (phoneLength == 9)
        phoneMask = '#####-#####'
    else if (phoneLength == 10)
        phoneMask = '(##) ####-#####'
    else if (phoneLength >= 11)
        phoneMask = '(##) #####-####'
    
    return phoneMask
}