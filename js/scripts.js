try {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', function (event) {
                event.stopPropagation();  
                console.log('Button clicked:', this.textContent.trim());
            });
        });
    });
    $(document).ready(function () {
        function checkItemsInView() {
            var viewportHeight = window.innerHeight;
            var scrollPosition = window.scrollY || window.pageYOffset;
    
            $('.vision-item').each(function () {
                var itemPosition = $(this).offset().top; 
                if (scrollPosition + viewportHeight / 1.5 >= itemPosition && !$(this).hasClass('animated')) {
                    $(this).css({
                        'visibility': 'visible',
                        'opacity': 1,
                        'transform': 'translateY(0px)'
                    }).addClass('animated'); 
                }
            });
        }
    
        function scrollListener() {
            checkItemsInView();
        }
    
        window.addEventListener('scroll', scrollListener);
        checkItemsInView();  
    });
    
    $(document).ready(function() {
        // Select all links with hashes
        $('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
                    && 
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000, function() {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                }
            });
    });
    
    function animateNumbers() {
        const numbers = document.querySelectorAll('.animate-number');
        const options = {
            threshold: 0,
            rootMargin: "0px 0px -50px 0px"
        };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = parseFloat(target.textContent.replace(/,/g, ''));
                    let startNumber = 0;
                    if (finalNumber === 0) {
                        startNumber = 100;
                    }
                    const decimalPlaces = (finalNumber % 1 === 0) ? 0 : finalNumber.toString().split('.')[1].length || 0;
                    const duration = Math.max(Math.min(finalNumber * 10, 5000), 2000); 
                    const step = (timestamp, startTime) => {
                        if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const percentage = Math.min(progress / duration, 1);
                        const number = startNumber + (finalNumber - startNumber) * percentage;
                        target.textContent = number.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        if (percentage < 1) {
                            requestAnimationFrame(timestamp => step(timestamp, startTime));
                        }
                    };
                    requestAnimationFrame(step);
                    observer.unobserve(target);
                }
            });
        }, options);
        numbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    animateNumbers();
    
    
    function toggleAccordion(element) {
        const content = element.nextElementSibling;
        if (content.style.maxHeight && content.style.maxHeight !== "0px") {
            content.style.maxHeight = "0px";
            element.querySelector('.accordion-icon').textContent = '+';
        } else {
            document.querySelectorAll('.accordion-content').forEach(function (item) {
                item.style.maxHeight = "0px";
                item.previousElementSibling.querySelector('.accordion-icon').textContent = '+';
            });
            content.style.maxHeight = content.scrollHeight + "px";
            element.querySelector('.accordion-icon').textContent = '-';
        }
    }
    
    document.querySelectorAll('.video-placeholder-container').forEach(item => {
        item.addEventListener('click', function () {
            var videoUrl = this.getAttribute('data-video_url');
            openVideoModal(videoUrl);
        });
    });
    
    function openVideoModal(videoUrl) {
        var modal = document.getElementById('videoModal');
        var iframe = document.getElementById('videoIframe');
        iframe.src = videoUrl + "&autoplay=1"; 
        modal.style.display = 'flex';
    }
    
    document.querySelector('.close').addEventListener('click', function () {
        try {
        var modal = document.getElementById('videoModal');
        var iframe = document.getElementById('videoIframe');
        iframe.src = "";
        modal.style.display = 'none';
        } catch (e) {
            console.log(e);
        }
    });
    
    window.onclick = function (event) {
        var modal = document.getElementById('videoModal');
        if (event.target == modal) {
            var iframe = document.getElementById('videoIframe');
            iframe.src = "";
            modal.style.display = 'none';
        }
    }
    
    $(document).ready(function () {
        var $photosInner = $('.photos-inner');
        $photosInner.hover(
            function () {
                $(this).css('animation-play-state', 'paused');
            },
            function () {
                $(this).css('animation-play-state', 'running');
            }
        );
    });
    $(document).ready(function () {
        $('.sandwich-button').click(function (event) {
            console.log('sandwich-button clicked');
            event.stopPropagation();  
            $(this).toggleClass('open');
            $('.mobile-menu-wrapper').toggleClass('active');
        });
    
        // Close the mobile menu when a link inside it is clicked
        $('.mobile-menu-wrapper a').click(function () {
            $('.mobile-menu-wrapper').removeClass('active');
            $('.sandwich-button').removeClass('open');
        });
    
        // Close the mobile menu when clicking outside of it
        $(document).click(function () {
            if ($('.mobile-menu-wrapper').hasClass('active')) {
                $('.mobile-menu-wrapper').removeClass('active');
                $('.sandwich-button').removeClass('open');
            }
        });
    
        $('.mobile-menu-wrapper').click(function (event) {
            event.stopPropagation();
        });
    
        $(window).on('scroll', function () {
            var scrollPosition = $(window).scrollTop();
            var viewportHeight = $(window).height();
    
            // Check if the scroll position is more than half the viewport height
            if (scrollPosition > viewportHeight / 4) {
                if ($('.mobile-menu-wrapper').hasClass('active')) {
                    $('.mobile-menu-wrapper').removeClass('active');
                    $('.sandwich-button').removeClass('open');
                }
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', function () {
        const elements = document.querySelectorAll('.token-grid .textarea');
    
        elements.forEach(element => {
            element.addEventListener('click', function () {
                // Using Clipboard API to copy text from a div
                navigator.clipboard.writeText(this.innerText).then(() => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Contract Address Copied to Clipboard',
                        icon: 'success',
                        confirmButtonColor: '#0452FF',
                        confirmButtonText: 'OK'
                    });
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to copy Contract Address',
                        icon: 'error',
                        confirmButtonColor: '#d33',
                        confirmButtonText: 'OK'
                    });
                });
            });
        });
    });
    
    window.addEventListener('resize', function() {
        const minWidth = 800;
        const minHeight = 600;
        if (window.innerWidth < minWidth || window.innerHeight < minHeight) {
            // Set window size to minimum dimensions if it goes below them
            window.resizeTo(minWidth, minHeight);
        }
    });
    $(document).ready(function() { 
        $('#gpt-popup').click(function (event) {
            // show this iframe
    //         <iframe style="height:100vh;width:100vw" frameBorder="0" 
    // src="https://widget.writesonic.com/CDN/index.html?service-base-url=https%3A%2F%2Fapi-azure.botsonic.ai&token=53bc7ee6-7fe2-4b5d-8102-5abb36249af0&base-origin=https%3A%2F%2Fbot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https%3A%2F%2Fbot.writesonic.com%2Fbots%2F1746c86c-9d8e-4223-a0c3-883aee8b8ed5%2Fintegrations">
    // </iframe>
            Swal.fire({
                title: "<strong>AI Boomer Assistant</strong>",
                html: `
                  <iframe style="height:400px;width:100%" frameBorder="0"
                    src="https://widget.writesonic.com/CDN/index.html?service-base-url=https%3A%2F%2Fapi-azure.botsonic.ai&token=53bc7ee6-7fe2-4b5d-8102-5abb36249af0&base-origin=https%3A%2F%2Fbot.writesonic.com&instance-name=Botsonic&standalone=true&page-url=https%3A%2F%2Fbot.writesonic.com%2Fbots%2F1746c86c-9d8e-4223-a0c3-883aee8b8ed5%2Fintegrations">
                    </iframe>
                `,
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                focusConfirm: false
            });
        }
        );
        // $('#pete-wallet').click(function(e){
        //     e.preventDefault();
        //     Swal.fire({
        //         title: "<strong>Check out Pete's Wallets!</strong>",
        //         imageUrl: "/images/pete-icon.svg",
        //         html: `
        //           Look Pete hasn’t sold and he’s not going to any time soon!
        //           <div class="swal-buttons" style="margin-top:1em;">
        //           <a target="_blank" href="https://basescan.org/token/0xcde172dc5ffc46d228838446c57c1227e0b82049?a=0xd319D4dd24cDB171a32015a527276aaA6FD4cB4b" class="button button-primary"><span class="material-symbols-outlined">
        //           wallet
        //           </span> Wallet 1</a>
        //           <a target="_blank" href="https://basescan.org/token/0xcde172dc5ffc46d228838446c57c1227e0b82049?a=0xC46346191f8fe043389144E934dE0C7Aab89c122" class="button button-primary"><span class="material-symbols-outlined">
        //           wallet
        //           </span> Wallet 2</a>
        //           </div>
        //         `,
        //         showCloseButton: true,
        //         showCancelButton: false,
        //         showConfirmButton: false,
        //         focusConfirm: false
        //       });
        // })
    });
    } catch(err) {
        console.log(err)
    }
    