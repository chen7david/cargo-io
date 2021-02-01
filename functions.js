const self = {
    randInt: (min,max) => Math.floor(Math.random() * (max - min + 1)) + min,
    serialInt: (mask) => {
        let serial = ""
        if(mask) {
            for(let i = 0; i < mask.length; i++){
                let maskChar = mask[i] 
                serial += maskChar == "0" ? self.randInt(0,9) : maskChar
            }
        }
        return serial
    },
}

module.exports = self