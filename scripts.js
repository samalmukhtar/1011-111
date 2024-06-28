let localStream;
let remoteStream;
let rtcPeerConnection;

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallBtn = document.getElementById('startCall');
const endCallBtn = document.getElementById('endCall');
const requestAccessBtn = document.getElementById('requestAccess');
const grantAccessBtn = document.getElementById('grantAccess');
const revokeAccessBtn = document.getElementById('revokeAccess');

// بدء المكالمة
startCallBtn.addEventListener('click', async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        const configuration = { iceServers: [{ urls: 'stun:stun.stunprotocol.org' }] };
        rtcPeerConnection = new RTCPeerConnection(configuration);
        localStream.getTracks().forEach(track => rtcPeerConnection.addTrack(track, localStream));

        rtcPeerConnection.ontrack = event => {
            remoteStream = event.streams[0];
            remoteVideo.srcObject = remoteStream;
        };

        const offer = await rtcPeerConnection.createOffer();
        await rtcPeerConnection.setLocalDescription(new RTCSessionDescription(offer));

        // يمكنك استخدام Firebase أو طريقة أخرى لإرسال واستقبال العروض والإجابات بين الأطراف
    } catch (error) {
        console.error('Error starting call:', error);
    }
});

// إنهاء المكالمة
endCallBtn.addEventListener('click', () => {
    localStream.getTracks().forEach(track => track.stop());
    rtcPeerConnection.close();
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
});

// طلب الولوج
requestAccessBtn.addEventListener('click', () => {
    alert('تم طلب الولوج');
});

// منح الولوج
grantAccessBtn.addEventListener('click', () => {
    alert('تم منح الولوج');
});

// قطع الولوج
revokeAccessBtn.addEventListener('click', () => {
    alert('تم قطع الولوج');
});
