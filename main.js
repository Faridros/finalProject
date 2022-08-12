const Name = document.getElementById('name')
const email = document.getElementById('email')
const postcode = document.getElementById('post')
const city = document.getElementById('city')
const github = document.getElementById('github')
const hire = document.getElementById('hire')
const comment = document.getElementById('comment')
const question = document.getElementById('question')
const hourInput = document.getElementById('hour')
const hour = document.querySelector('.hour')
const message = document.getElementById('message')
const form = document.getElementById('contact')

const Regex_Post = /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/


let purpose = ''

hire.addEventListener('click', () => {
    purpose = 'Hire'
    hour.classList.remove('display-none')
})
question.addEventListener('click', () => {
    purpose = 'Question'
    hour.classList.add('display-none')
})
comment.addEventListener('click', () => {
    purpose = 'Comment'
    hour.classList.add('display-none')
})

form.onsubmit = function (e) {
    e.preventDefault()
    const testPost = Regex_Post.test(postcode.value)
    console.log(testPost)
    if (!testPost) return
    if (Name.value && email.value && city.value && github.value && purpose && message.value) {
        if (purpose === 'Hire' && !hourInput.value) return
        fetch('https://httpbin.org/post',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: Name.value,
                    postcode: postcode.value,
                    email: email.value,
                    city: city.value,
                    reason: purpose,
                    github: github.value,
                    message: message.value,
                    hourRate: hourInput.value ? hourInput.value : undefined
                })
            }).then(response => {
                if (response.ok) {
                    Name.value = ''
                    postcode.value = ''
                    email.value = ""
                    city.value = ""
                    reason = ""
                    github.value = ''
                    hourInput.value = ''
                    message.value = ''
                    hire.checked = false
                    question.checked = false
                    comment.checked = false
                }
            })
    }
}