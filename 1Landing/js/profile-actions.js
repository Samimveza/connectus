/**
 * ConnectUs Profile Actions
 * Handles QR code display and vCard download functionality
 */
 
document.addEventListener("DOMContentLoaded", function() {
    // QR Code Modal functionality
    const showQrBtn = document.getElementById('show-qr-btn');
    const closeQrModalBtn = document.getElementById('close-qr-modal');
    const qrModal = document.getElementById('qr-modal');
    const downloadQrBtn = document.getElementById('download-qr-btn');
    const shareQrBtn = document.getElementById('share-qr-btn');
    const qrcodeContainer = document.getElementById('qrcode');
    
    // vCard download functionality
    const saveContactBtn = document.getElementById('save-contact-btn');
    const vcardData = document.getElementById('vcard-data');
    const otherData = document.getElementById('other-data');
    // QR code instance
    let qrCodeInstance = null;
    
    // Get the profile URL for QR code generation
    const profileUrl = vcardData ? vcardData.getAttribute('data-url') : window.location.href;
    const otherUrl = otherData ? otherData.getAttribute('data-url') : window.location.href;

    // Track page view for analytics
    trackProfileView();
    
    // Show QR code modal when clicking the QR button
    if (showQrBtn && qrModal) {
        showQrBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Generate QR code on first click
            if (!qrCodeInstance && qrcodeContainer) {
                // Clear any existing content
                qrcodeContainer.innerHTML = '';
                
                // Generate QR code
                qrCodeInstance = new QRCode(qrcodeContainer, {
                    text: otherUrl,
                    width: 300,
                    height: 300,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
            }
            
            qrModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });
    }
    
    // Close QR code modal when clicking the close button
    if (closeQrModalBtn && qrModal) {
        closeQrModalBtn.addEventListener('click', function() {
            qrModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
        
        // Also close when clicking outside the modal
        qrModal.addEventListener('click', function(e) {
            if (e.target === qrModal) {
                qrModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Download QR code image
    if (downloadQrBtn && qrcodeContainer) {
        downloadQrBtn.addEventListener('click', function() {
            if (!qrcodeContainer) return;
            
            const fullName = vcardData ? vcardData.getAttribute('data-fullname') : 'contact';
            
            // Get the canvas from the QR Code element
            const canvas = qrcodeContainer.querySelector('canvas');
            
            if (canvas) {
                // Convert canvas to data URL
                const imgData = canvas.toDataURL('image/png');
                
                // Create a temporary link element to trigger download
                const tempLink = document.createElement('a');
                tempLink.href = imgData;
                tempLink.download = `${fullName.replace(/\s+/g, '-')}-QR-Code.png`;
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            } else {
                // Fallback for browsers without canvas support
                alert('Download not supported in this browser');
            }
        });
    }
    
    // Share QR code (Web Share API if available)
    if (shareQrBtn) {
        shareQrBtn.addEventListener('click', function() {
            const fullName = vcardData ? vcardData.getAttribute('data-fullname') : 'contact';
            
            if (navigator.share) {
                navigator.share({
                    title: `${fullName}'s Digital Profile`,
                    text: `Check out ${fullName}'s digital profile on ConnectUs`,
                    url: profileUrl
                }).catch(console.error);
            } else {
                // Fallback - copy to clipboard
                navigator.clipboard.writeText(profileUrl)
                    .then(() => {
                        alert('Profile link copied to clipboard!');
                    })
                    .catch(() => {
                        // Show the URL for manual copying if clipboard API fails
                        prompt('Copy this link to share:', profileUrl);
                    });
            }
        });
    }
    
    // vCard generation and download
    if (saveContactBtn && vcardData) {
        saveContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            generateAndDownloadVCard();
        });
    }
    
    /**
     * Track profile view by sending a POST request to the analytics API
     */
    function trackProfileView() {
        try {
            // Extract slug from URL (format: /in/slug)
            const pathParts = window.location.pathname.split('/');
            if(slug == null || slug == undefined || slug == ''){
                return;
            }
            
            
            // Extract cardRequestType from URL parameter 's' or default to 1
            const urlParams = new URLSearchParams(window.location.search);
            const cardRequestType = urlParams.get('s') || '';
            
            // Prepare the request data
            const data = {
                cardRequestType: cardRequestType,
                slug: slug
            };
            
            // Send the tracking data
            fetch(apiEndpoint + '/api/card-scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Profile view tracked successfully');
            })
            .catch(error => {
                console.error('Error tracking profile view:', error);
            });
        } catch (error) {
            console.error('Error in trackProfileView:', error);
        }
    }
    
    /**
     * Generate and download a vCard file
     */
    function generateAndDownloadVCard() {
        // Get vCard data from the hidden div
        const fullName = vcardData.getAttribute('data-fullname') || '';
        const phone = vcardData.getAttribute('data-phone') || '';
        const email = vcardData.getAttribute('data-email') || '';
        const org = vcardData.getAttribute('data-org') || '';
        const title = vcardData.getAttribute('data-title') || '';
        const photoUrl = vcardData.getAttribute('data-photo') || '';
        
        // Split the name into parts (assuming format is "First Last")
        const nameParts = fullName.split(' ');
        const lastName = nameParts.length > 1 ? nameParts.pop() : '';
        const firstName = nameParts.join(' ');
        
        // Create vCard content - compatible with both iOS and Android
        // RFC 6350 compliant format
        let vCardContent = 'BEGIN:VCARD\r\n';
        vCardContent += 'VERSION:3.0\r\n';
        vCardContent += `N:${lastName};${firstName};;;\r\n`;
        vCardContent += `FN:${fullName}\r\n`;
        
        if (org) {
            vCardContent += `ORG:${org}\r\n`;
        }
        
        if (title) {
            vCardContent += `TITLE:${title}\r\n`;
        }
        
        if (phone) {
            vCardContent += `TEL;type=CELL:+${phone}\r\n`;
        }
        
        if (email) {
            vCardContent += `EMAIL:${email}\r\n`;
        }
        
        if (profileUrl) {
            vCardContent += `URL:${profileUrl}\r\n`;
        }
        
        // Add photo if available
        if (photoUrl) {
            // For simplicity, we're adding photo as a URL reference
            // Some clients may not support this, but it's the most compatible approach
            // without having to fetch and encode the image
            vCardContent += `PHOTO;VALUE=URI:${photoUrl}\r\n`;
        }
        
        vCardContent += `SOURCE:${profileUrl}\r\n`;
        vCardContent += 'REV:' + new Date().toISOString() + '\r\n';
        vCardContent += 'END:VCARD';
        
        // Create a data URI for the vCard file
        const vCardBlob = new Blob([vCardContent], { type: 'text/vcard' });
        const vCardUrl = URL.createObjectURL(vCardBlob);
        
        // Create a link element and trigger download
        const downloadLink = document.createElement('a');
        downloadLink.download = `${fullName.replace(/\s+/g, '-')}.vcf`;
        downloadLink.href = vCardUrl;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // Clean up
        setTimeout(function() {
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(vCardUrl);
        }, 100);
    }
}); 