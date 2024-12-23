const uploadArea = document.getElementById('uploadArea');
const uploadText = document.getElementById('upload-text');
const fileInput = document.getElementById("avatar");
const uploadIcon = document.querySelector(".upload-icon")
const maxFileSize = 500 * 1024;
const removeBtn = document.getElementById('removeBtn');
const changeBtn = document.getElementById('ChangeBtn');
let clicked;
const nameInput = document.getElementById("fullNameInput");
const emailInput = document.getElementById("emailinput");
const gitHubUserName = document.getElementById("gitHub");
let userImage;
document.getElementById('generateBtn').addEventListener('click' , ()=>{
    generateTicket();
})

function generateTicket(){
    if(nameInput.value != '' && emailInput.value != '' && gitHubUserName.value != '' && clicked == true){
        if(checkEmail){
            document.getElementById("fullName").innerHTML = nameInput.value;
            document.getElementById("emailAddress").innerHTML =emailInput.value;
            document.getElementById("gitHubName").innerHTML = gitHubUserName.value;
            document.getElementById("ticket-name").innerHTML = nameInput.value;
            const img = document.getElementById("userTicketImage");
            img.src = userImage;
            img.style.height = "80px";
            img.style.objectFit = "cover";
            document.querySelector(".ticket").classList.remove('d-none');
            document.querySelector(".data").classList.add('d-none');
        }
        else{
            document.querySelector(".ticket").classList.add('d-none');
            document.querySelector(".data").classList.remove('d-none');
            document.querySelector('.email-info').classList.remove("d-none");
        }
        document.querySelector(".err-Msg").classList.add('d-none')
    }
    else{
        document.querySelector(".err-Msg").classList.remove('d-none')
    }
}
emailInput.addEventListener("input",()=>{
    checkEmail();
})
function checkEmail(){
    let myReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(myReg.test(emailInput.value.toLowerCase()) == true){
        document.querySelector('.email-info').classList.add("d-none");
        return true;
    }else{
        document.querySelector('.email-info').classList.remove("d-none");
        return false;
    }
}

uploadArea.addEventListener('click',()=>{
    if(!clicked){
        openFile();
    }
})

function openFile(){
    fileInput.click()
    clicked = true;
}
fileInput.addEventListener("change" , (event)=>{
    handleFile(event.target.files)
})

uploadArea.addEventListener("dragover" , (event)=>{
    event.preventDefault();
    uploadArea.style.borderColor = '#red';

})

uploadArea.addEventListener("dragleave" , (event)=>{
    uploadArea.style.borderColor = 'gray'
})


uploadArea.addEventListener("drop" , (event)=>{
    event.preventDefault();
    uploadArea.style.borderColor = 'gray';
    const files = event.dataTransfer.files;
    handleFile(files);

})

removeBtn.addEventListener("click" , (event)=>{
    event.stopPropagation();
    const file = [];
    const img = document.querySelector(".upload-icon img");
    img.src = "../assets/images/icon-upload.svg"
    handleFile(file);
})

changeBtn.addEventListener("click" , (event)=>{
    event.stopPropagation();
    openFile();
})

function handleFile(files){
    if(files.length > 0){
        const file = files[0];
        const fileSize = file.size;

        if(fileSize > maxFileSize){
            document.querySelector(".info span").innerHTML = 'File too large , please upload a photo under 500kb';
            document.querySelector(".info span").classList.add('text-danger');
            clicked = false;
        }
        else{
            document.querySelector(".info span").innerHTML = 'Upload your photo (JPG or PNG, max size: 500KB).';
            document.querySelector(".info span").classList.remove('text-danger');
            uploadText.style.display = 'none'
            const reader = new FileReader();
            reader.onload = (event)=>{
                const img = document.querySelector(".upload-icon img");
                img.src = event.target.result;
                userImage = event.target.result;
                img.style.margin = '0';
                img.style.width = "47.6px";
                img.style.height = "47.6px";
                img.style.objectFit = "cover";
                document.querySelector(".image-buttons").classList.remove('d-none');
            }
            reader.readAsDataURL(file);
            uploadArea.addEventListener("click" , (event)=>{
                event.stopPropagation();
            })
        }

        
    }
}
