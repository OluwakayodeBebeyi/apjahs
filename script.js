/*=====================================================
    ADEGBOLE PRECIOUS-JEWEL ACADEMY
    MAIN JAVASCRIPT
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        STICKY HEADER
    =========================================*/

    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
            header.style.padding = "12px 8%";
            header.style.background = "rgba(255,255,255,.98)";
            header.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";
        } else {
            header.style.padding = "18px 8%";
            header.style.background = "rgba(255,255,255,.95)";
            header.style.boxShadow = "0 2px 20px rgba(0,0,0,.05)";
        }

        if (currentScrollY > lastScrollY && currentScrollY > 120) {
            header.classList.add("nav-hidden");
            header.classList.remove("nav-visible");
        } else {
            header.classList.remove("nav-hidden");
            header.classList.add("nav-visible");
        }

        lastScrollY = currentScrollY;
    });

    /*=========================================
        SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    /*=========================================
        ACTIVE NAVIGATION
    =========================================*/

    const sections=document.querySelectorAll("section");

    const navLinks=document.querySelectorAll("nav a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const sectionTop=section.offsetTop-120;

            const sectionHeight=section.clientHeight;

            if(scrollY>=sectionTop){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#" + current){

                link.classList.add("active");

            }

        });

    });

    /*=========================================
        SCROLL REVEAL
    =========================================*/

    const revealElements=document.querySelectorAll(

        ".about,.founder,.programs,.statistics,.gallery,.testimonials,.news,.cta,.contact"

    );

    function reveal(){

        revealElements.forEach(el=>{

            const windowHeight=window.innerHeight;

            const top=el.getBoundingClientRect().top;

            const visible=120;

            if(top < windowHeight-visible){

                el.classList.add("show");

            }

        });

    }

    window.addEventListener("scroll",reveal);

    reveal();

    /*=========================================
        SCHOOL AGE
    =========================================*/

    const schoolOpeningDate = new Date(2019, 8, 1);

    function updateSchoolAge(){
        const today = new Date();
        let schoolAge = today.getFullYear() - schoolOpeningDate.getFullYear();
        const anniversaryThisYear = new Date(
            today.getFullYear(),
            schoolOpeningDate.getMonth(),
            schoolOpeningDate.getDate()
        );

        if (today < anniversaryThisYear) schoolAge -= 1;
        schoolAge = Math.max(0, schoolAge);

        document.querySelectorAll("[data-school-age]").forEach(ageElement => {
            ageElement.textContent = `${schoolAge}+`;
            ageElement.dataset.target = schoolAge;
            ageElement.dataset.suffix = "+";
        });
    }

    function scheduleNextSchoolAgeUpdate(){
        const now = new Date();
        const nextAnniversary = new Date(
            now.getFullYear() + (now >= new Date(now.getFullYear(), 8, 1) ? 1 : 0),
            schoolOpeningDate.getMonth(),
            schoolOpeningDate.getDate()
        );
        const delay = nextAnniversary.getTime() - now.getTime() + 1000;

        window.setTimeout(() => {
            updateSchoolAge();
            scheduleNextSchoolAgeUpdate();
        }, delay);
    }

    updateSchoolAge();
    scheduleNextSchoolAgeUpdate();
    document.addEventListener("visibilitychange", updateSchoolAge);

    /*=========================================
        STATISTICS COUNTER
    =========================================*/

    const counters=document.querySelectorAll(".stat h2");

    let counterStarted=false;

    function startCounter(){

        if(counterStarted) return;

        const stats=document.querySelector(".statistics");

        if(!stats) return;

        const top=stats.getBoundingClientRect().top;

        if(top < window.innerHeight-150){

            counterStarted=true;

            counters.forEach(counter=>{

                const text=counter.innerText;

                const target=parseInt(text.replace(/\D/g,"") );

                const suffix=text.replace(/[0-9]/g,"");

                let count=0;

                const speed=target/120;

                function update(){

                    count+=speed;

                    if(count<target){

                        counter.innerText=Math.floor(count)+suffix;

                        requestAnimationFrame(update);

                    }

                    else{

                        counter.innerText=target+suffix;

                    }

                }

                update();

            });

        }

    }

    window.addEventListener("scroll",startCounter);

    startCounter();

    /*=========================================
        BACK TO TOP BUTTON
    =========================================*/

    const topButton=document.createElement("button");

    topButton.innerHTML="↑";

    topButton.id="topButton";

    document.body.appendChild(topButton);

    topButton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    window.addEventListener("scroll",()=>{

        if(window.scrollY>400){

            topButton.classList.add("show");

        }

        else{

            topButton.classList.remove("show");

        }

    });

    /*=========================================
        PRELOADER SUPPORT
    =========================================*/

    const loader=document.querySelector(".loader");

    if(loader){

        window.addEventListener("load",()=>{

            loader.style.opacity="0";

            setTimeout(()=>{

                loader.style.display="none";

            },600);

        });

    }

});

