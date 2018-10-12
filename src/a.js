import { ApiAiClient } from 'api-ai-javascript'

const client = new ApiAiClient({accessToken: config.app.token}) // <- replace it with yours

export default {
    name: 'app',
    data: function(){
        return {
            answers: [],
            query: '',
            speech: config.locale.strings.voiceTitle,
            micro: false,
            muted: config.app.muted,
            online: navigator.onLine,
            config
        }
    },
    watch: {
        answers: function(val){
            setTimeout(() => { 
                document.querySelector('#bottom').scrollIntoView({ 
                    behavior: 'smooth' 
                })
            }, 2) // if new answers arrive, wait for render and then smoothly scroll down to #bottom selector, used as anchor
        }
    },
    methods: {
        submit(){
            client.textRequest(this.query).then((response) => {
                if(response.result.action == "input.unknown" && this.config.app.googleIt == true){
                    response.result.fulfillment.messages[0].unknown = true
                    response.result.fulfillment.messages[0].text = response.result.resolvedQuery
                } // if the googleIt is enabled, show the button

                this.answers.push(response)
                this.handle(response) // <- handle the response in handle() method

                this.query = ''
                this.speech = config.locale.strings.voiceTitle // <- reset query and speech
            })
        },
        handle(response){
            if(response.result.fulfillment.speech || response.result.fulfillment.messages[0].type == 'simple_response'){
                let speech = new SpeechSynthesisUtterance(response.result.fulfillment.speech || response.result.fulfillment.messages[0].textToSpeech)
                speech.voiceURI = 'native'
                speech.lang = config.locale.settings.speechLang

                if(this.muted == false) window.speechSynthesis.speak(speech) // <- Speech output if microphone is allowed
            }
        },
        autosubmit(suggestion){
            this.query = suggestion
            this.submit()
        },
        mute(mode){
            this.muted = mode
        },
        microphone(mode){
            this.micro = mode
            let self = this // <- correct scope

            if(mode == true){
                let recognition = new webkitSpeechRecognition() // <- chrome speech recognition

                recognition.interimResults = true
                recognition.lang = config.locale.settings.recognitionLang
			    recognition.start()

                recognition.onresult = function(event){
			        for (var i = event.resultIndex; i < event.results.length; ++i){
			    	    self.speech = event.results[i][0].transcript
			        }
			    }

			    recognition.onend = function(){
				    recognition.stop()
                    self.micro = false
                    self.autosubmit(self.speech)
			    }
            }
        }
    }
}