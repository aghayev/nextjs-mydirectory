const lodash = require('lodash')

// Function converting dot-key string to JSON data
function dotKeyStrToJson(path, obj) {
  //var parts = path.split("."), part
  var parts = path.split(".")
  var last = parts.pop().split(":")
  while (part = parts.shift()) {
    if (typeof obj[part] != "object") obj[part] = {}
    obj = obj[part]
  }
  obj[last[0]] = last[1]
}

// Function to recursively find new missing keys from existing 'src' file into final output
function findMissingJsonKeys(a, b) {
    var result = {
      missing: []
    }
    lodash.reduce(a, function (result, value, key) {
      if (b.hasOwnProperty(key)) {
        if (lodash.isEqual(value, b[key])) {
          return result
        } else {
          if (typeof (a[key]) != typeof ({}) || typeof (b[key]) != typeof ({})) {
            return result
          } else {
            var deeper = findMissingJsonKeys(a[key], b[key])
            result.missing = result.missing.concat(lodash.map(deeper.missing, (sub_path) => {
                return key + "." + sub_path
              }))
  

            return result
          }
        }
      } else {
        if (typeof (a[key]) === 'object') {
          const missingObjEntries = Object.entries(a[key])

          missingObjEntries.map((obj) => {
            result.missing.push(key.concat('.',obj[0]+':'+'@'+obj[1]+'@'))
        })
        }
        else {
          result.missing.push(key+':'+'@'+a[key]+'@')
        }
        return result
      }
    }, result)
    return result
  }

  const matchingJsonData = {
    "RegistrationLayout": {
        "NewCustomer": "Nuovo Utente?",
        "SignIn": "Accedi",
        "Account": " Hai già un'utenza? ",
        "FirstName": "Nome",
        "LastName": "Cognome",
        "Email": "Indirizzo email",
        "ConfirmEmail": "Conferma e-mail",
        "Phone": "Telefono",
        "Password": "Nuova password",
        "ConfirmPassword": "Conferma nuova password",
        "TextContent": "Ricevi idee per la progettazione della casa inviate alla tua casella di posta",
        "Title": "Nuovo cliente",
        "TitleMobile": "O crea un account",
        "SubTitle": "Non hai un account? Gestisci tutte le tue esigenze di cura della vista e ottieni offerte esclusive.",
        "RegisterComplete": "Completa Registrazione ",
        "Submit": "Registrati",
        "DateOfBirth": "Data di nascita",
        "Day": "Giorno",
        "Month": "Mese",
        "Year": "Anno",
        "FiscalCode": "Codice Fiscale",
        "DateOfBirthHelper": "Tieni presente che devi avere 16 anni o effettuare un ordine per iscriverti a N1",
        "Privacy": "Facendo clic su Invia di seguito accetti i nostri <1>Termini di utilizzo</1> e la <2>Informativa sulla privacy</2>.",
        "PrivacyPolicy1": "Ho letto e compreso l'<privacyLink>{{linkText}}</privacyLink> relativa al trattamento dei miei dati personali.*",
        "PrivacyPolicyUrl": "/c/informativa-sulla-privacy",
        "PrivacyPolicyUrlText": "Informativa sulla Privacy",
        "PrivacyPolicy2": "Desidero ricevere le offerte esclusive Vision Direct via email.",
        "PrivacyPolicy2CTA": "Visualizza la <0>Informativa sulla privacy</0>.",
        "PrivacyPolicyEu3": "Accetto la profilazione della mia attività sul sito da parte di EssilorLuxottica. per ricevere offerte basate sui miei interessi, sullo storico dei miei ordini e sulla mia esperienza su N1 (vedi Privacy Policy)",
        "Msgs": {
          "LettersOnly": "Inserisci solo lettere.",
          "InvalidFormat": "Formato invalido.",
          "InvalidFirstName": "Inserisci il tuo nome.",
          "InvalidLastName": "Inserisci il tuo cognome.",
          "InvalidEmail": "Inserisci un indirizzo email valido.",
          "InvalidEmail2": "Inserisci di nuovo un indirizzo email valido.",
          "InvalidDateOfBirth": "Inserisci la tua data di nascita.",
          "InvalidPassword1": "Minimo 6 caratteri. Deve contenere almeno un numero e una lettera.",
          "InvalidConfirmPassword": "La password che hai inserito non corrisponde",
          "InvalidFiscalCode": "Codice fiscale non valido",
          "InvalidPasswordSameOfOld": "The password you entered is the same of te old one",
          "InvalidPrivacy1": "Accetta l'informativa sulla privacy",
          "InvalidDateValue": "Messaggio di errore: l'utente deve avere almeno 16 anni",
          "InvalidDateType": "Il formato della data non è valido",
          "Requirements": {
            "MinimumLengthEight": "Minimo 8 caratteri",
            "MinimumLengthTwo": "Il nome deve avere almeno 2 caratteri",
            "Uppercase": "Deve contenere almeno una lettera maiuscola.",
            "Lowercase": "Deve contenere almeno una lettera minuscola.",
            "Number": "Deve contenere almeno una cifra.",
            "SpecialCharacter": "Deve contenere almeno un carattere spaziale (!£#)."
          },
          "Rules": {
            "MinLength": "caratteri",
            "MinLength2": "8 caratteri",
            "HasUppercaseLetter": "1 lettera maiuscola (A-Z)",
            "HasLowercaseLetter": "1 lettera minuscola (a-z)",
            "IsNumber": "1 numero (0-9)",
            "HasSpecialCharacter": "1 carattere speciale (!£#)"
          },
          "Info": {
            "ToolTip": "Codice Fiscale necessario per la fatturazione."
          },
          "Empty": {
            "firstName": "Campo obbligatorio",
            "lastName": "Campo obbligatorio",
            "email": "Campo obbligatorio",
            "email2": "Campo obbligatorio",
            "newPassword": "Inserisci la tua nuova password",
            "confirmPassword": "Per favore inserisci nuovamente la tua nuova password"
          }
        }
      }
    }

  const fromTranslationsJsonData = {
    "RegistrationLayout": {
        "NewCustomer": "Nuovo cliente?",
        "SignIn": "Registrati",
        "Account": "Hai già un account?",
        "FirstName": "Nome",
        "LastName": "Cognome",
        "Email": "Indirizzo E-mail",
        "ConfirmEmail": "Conferma l'indirizzo e-mail",
        "Phone": "Numero di telefono (facoltativo)",
        "Password": "Password",
        "VerifyPassword": "Conferma la tua password",
        "TextContent": "Ricevi idee per la progettazione della casa inviate alla tua casella di posta",
        "Title": "Crea un account",
        "TitleMobile": "O crea un account",
        "SubTitle": "Non hai un account? Gestisci tutte le tue necessità per la cura degli occhi e ricevi offerte esclusive.",
        "RegisterComplete": "Completa la registrazione ",
        "Submit": "Crea un account",
        "DateOfBirth": "Data di nascita",
        "Day": "Giorno",
        "Month": "Mese",
        "Year": "Anno",
        "FiscalCode": "Codice Fiscale",
        "DateOfBirthHelper": "Per iscriversi a è necessario avere dai 16 anni in su",
        "Privacy": "Cliccando su invia accetti i nostri <1>Termini d'uso</1> e la nostra <2>Normativa sulla privacy</2>.",
        "PrivacyPolicy1": "Ho letto compreso la <0>Normativa sulla Privacy</0> sull'elaborazione dei miei dati personali.",
        "PrivacyPolicy2": "Desidero ricevere le offerte esclusive Vision Direct via e-mail.",
        "PrivacyPolicy2CTA": "Visualizza l'<0>Informativa sulla privacy</0>.",
        "PrivacyPolicyEu3": "Consento a Luxottica Group S.p.A. di tracciare la mia attività sul sito web per ricevere offerte in base ai miei interessi, la cronologia dei miei ordini e la mia esperienza su Davidclulow.com (visita Normativa sulla privacy)",
        "Msgs": {
          "LettersOnly": "Inserisci solo lettere.",
          "InvalidFormat": "Formato non valido",
          "InvalidFirstName": "Inserisci il tuo nome.",
          "InvalidLastName": "Inserisci il tuo cognome.",
          "InvalidEmail": "Inserisci un indirizzo e-mail valido.",
          "InvalidEmail2": "Inserisci di nuovo un indirizzo e-mail valido.",
          "InvalidDateOfBirth": "Inserisci la tua data di nascita.",
          "InvalidPassword1": "Minimo 6 caratteri. Deve contenere almeno un numero e una lettera.",
          "InvalidVerifyPassword": "La password inserita non corrisponde",
          "InvalidFiscalCode": "Codice fiscale non valido",
          "InvalidPasswordSameOfOld": "La password inserita è la stessa di quella precedente",
          "InvalidPrivacy1": "Accetta l'informativa sulla privacy",
          "InvalidDateValue": "Messaggio di errore: l'utente deve avere almeno 16 anni",
          "InvalidDateType": "Il formato della data non è valido",
          "Requirements": {
            "MinimumLength": "Minimo 8 caratteri",
            "Uppercase": "Deve contenere almeno una lettera maiuscola.",
            "Lowercase": "Deve contenere almeno una lettera minuscola.",
            "Number": "Deve contenere almeno una cifra.",
            "SpecialCharacter": "Deve contenere almeno un carattere speciale (!£#)."
          },
          "Info": {
            "ToolTip": "Codice Fiscale necessario per la fatturazione."
          },
          "Empty": {
            "firstName": "Inserisci il tuo nome",
            "lastName": "Inserisci il tuo cognome",
            "email": "Inserisci il un indirizzo e-mail valido",
            "email2": "Inserisci il un indirizzo e-mail valido",
            "password2": "Inserisci di nuovo la password",
            "fiscalCode": "Inserisci il codice fiscale"
          }
        }
      }    
  }


  var result = findMissingJsonKeys(
    matchingJsonData, 
    JSON.parse(JSON.stringify(fromTranslationsJsonData).replace(/\:null/gi, "\:\"\""))
  )

  var missingJsonData = {}
  result['missing'].map((row) => {
    dotKeyStrToJson(row, missingJsonData)
  })

console.log(JSON.stringify(missingJsonData, '', 2))