
document.getElementById('loginbtn').addEventListener('click',loginWithFacebook, false)

function loginWithFacebook(){
    FB.login(response=>{
        console.log("fb result find in data",response);
        const {authResponse:{accessToken,userID,name,} }=response
        fetch('/login-with-facebook',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({accessToken,userID,name})
        }).then(res=>{
            console.log(res);
        })
        FB.api('/me', function(response) {
            console.log("facebook data find ",JSON.stringify(response));
        });

    },{scope: 'public_profile,email'})
    return false
}
