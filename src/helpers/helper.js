let exports = {};


// const API_URL = "http://127.0.0.1:8000/api/"
// const STORAGE_URL = "http://127.0.0.1:8000/"
// const APP_URL = "http://localhost:8080/"


const API_URL = "https://cdnnew.green-tech-innovation.com/api/"
const STORAGE_URL = "https://cdnnew.green-tech-innovation.com/"
const APP_URL = "https://panel-cdnnew.green-tech-innovation.com/";

const CLIENT_TOKEN = "jwt"

exports.CLIENT_TOKEN = CLIENT_TOKEN
exports.STORAGE_URL = STORAGE_URL


exports.requestOptions = (method = "GET", formdata = new FormData()) => {
    let myHeaders = new Headers();

    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

    if (exports.isConnected()) {
        myHeaders.append('Authorization', "Bearer " + exports.clientToken());
    }


    let requestOptions = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    };

    if (method != "GET") {
        requestOptions.body = formdata
    }

    return requestOptions;
}


exports.requestOptionsJSON = (method = "GET", body = {}) => {

    let myHeaders = new Headers();

    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    if (exports.isConnected()) {
        myHeaders.append('Authorization', "Bearer " + exports.clientToken());
    }

    let requestOptionsJSON = {
        method: method,
        headers: myHeaders,
        redirect: 'follow'
    };

    if (method != "GET") {
        requestOptionsJSON.body = JSON.stringify(body)
    }

    return requestOptionsJSON;
}

exports.tokenChecker = (status) => {
    if (status == 422) {
        localStorage.removeItem(exports.CLIENT_TOKEN)
        exports.redirect(exports.route('login', null, false))
        localStorage.setItem('logout_message', "token_expire")
    }
    if (status == 401) {
        exports.redirect(exports.route('logout', null, false))
    }
}

exports.html_entity_decode = (message) => {
    return message.replace(/[<>'"]/g, function(m) {
        return '&' + {
            '\'': 'apos',
            '"': 'quot',
            '&': 'amp',
            '<': 'lt',
            '>': 'gt',
        }[m] + ';';
    });
}


exports.required = (input) => {
    if (input != null) {
        if (input.length === 0) {
            return "Veuillez remplir ce champs";
        } else {
            return "";
        }
    } else {
        return "";
    }

}

exports.checkEmail = (input) => {
    var filter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    if (filter.test(input)) {
        return "";
    } else {
        return "Email incorrect";
    }
}


exports.checkPassword = (input) => {
    if (input.length < 6) {
        return "Au moins 6 caractères";
    } else {
        return "";
    }
}


exports.toDate = (date) => {
    const d = new Date(date);
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate()

    if (day < 10) {
        day = "0" + day
    }
    if (month < 10) {
        month = "0" + month
    }
    return day + "/" + month + "/" + year;
}

exports.plurial = (message = "", length = 0) => {
    if (length > 1) {
        return " " + message + "s "
    } else {
        return " " + message + " "
    }
}

exports.redirect = (route) => {
    window.location.href = route;
}

exports.route = (pagePath, args = null, api = true) => {
    if (args != null) {
        for (let i = 0; i < args.length; i++) {
            if (i === 0) {
                pagePath = pagePath + args[i];
            } else {
                pagePath = pagePath + '-' + args[i];
            }
        }
    }
    return (api ? (API_URL) : (APP_URL + "")) + pagePath;
}

exports.asset = (path) => {
    return API_URL + path;
}

exports.isset = (element) => {
    return (typeof element !== 'undefined') ? true : false;
}




exports.setLocalstorage = (cname, cvalue) => {
    localStorage.setItem(cname, cvalue);
    return true
}

exports.deleteLocalstorage = (cname) => {
    localStorage.removeItem(cname)
    return true
}

exports.getLocalstorage = (cname) => {
    let content = localStorage.getItem(cname)
    if (content != null) {
        return content
    }
    return "";
}

exports.checkLocalstorage = (cname) => {
    let cookie = exports.getLocalstorage(cname);
    if (cookie != "") {
        return true
    } else {
        return false
    }
}

exports.isConnected = () => {
    return exports.checkLocalstorage(CLIENT_TOKEN)
}

exports.clientToken = () => {
    return exports.getLocalstorage(CLIENT_TOKEN)
}

exports.validateUserName = (username) => {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
}


exports.getError = (problems, key) => {
    if (problems[key] != undefined) {
        return problems[key].join(";")
    }
    return ""
}

exports.objectNumberKey = (obj) => {
    return Object.keys(obj).length;
}


exports.truncate = (text, length, clamp = "...") => {
    return text.length > length ? text.slice(0, length) + clamp : text;
};
exports.capitalize = (value) => {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
}




exports.timestampToDate = (timestamp, withoutHour = true) => {
    let date = new Date(timestamp)
    if (withoutHour) {
        return date.customFormat("DD/MM/YYYY")
    }
    return date.customFormat("DD/MM/YYYY à hh:mm:ss")
}


export default exports;