document.addEventListener("DOMContentLoaded", function() {
    const profilePic = document.getElementById("profile-pic");
    
    profilePic.addEventListener("click", function() {
        profilePic.classList.add("explode");
        
        setTimeout(() => {
            profilePic.style.display = "none";
        }, 500);
    });

    function createBubbles() {
        const body = document.body;
        for (let i = 0; i < 10; i++) {
            let bubble = document.createElement("div");
            bubble.classList.add("bubble");
            bubble.style.width = `${Math.random() * 60 + 20}px`;
            bubble.style.height = bubble.style.width;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.animationDuration = `${Math.random() * 5 + 3}s`;
            body.appendChild(bubble);
            setTimeout(() => bubble.remove(), 8000);
        }
    }
    
    setInterval(createBubbles, 3000);
});

