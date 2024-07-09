
// import React, { useRef, useState } from 'react';

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [localStream, setLocalStream] = useState(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [isCameraOn, setIsCameraOn] = useState(false);

//   const startCallHandler = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setLocalStream(stream);
//       localVideoRef.current.srcObject = stream;

//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
//       });
//       setPeerConnection(pc);

//       // Add local stream to peer connection
//       stream.getTracks().forEach((track) => pc.addTrack(track, stream));

//       // Handle incoming tracks from remote
//       pc.ontrack = (event) => {
//         if (remoteVideoRef.current) {
//           remoteVideoRef.current.srcObject = event.streams[0];
//         }
//       };

//       // Handle ICE candidate events
//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           // Send ICE candidate to signaling server
//         }
//       };

//       // Handle negotiation needed event (for renegotiation)
//       pc.onnegotiationneeded = async () => {
//         try {
//           await pc.setLocalDescription(await pc.createOffer());
//           // Send local description to signaling server
//         } catch (err) {
//           console.error('Error creating offer:', err);
//         }
//       };

//       setIsCameraOn(true);
//     } catch (err) {
//       console.error('Error accessing media devices:', err);
//     }
//   };

//   const stopCallHandler = () => {
//     if (peerConnection) {
//       peerConnection.close();
//     }
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//     }
//     setLocalStream(null);
//     setPeerConnection(null);
//     setIsCameraOn(false);
//     localVideoRef.current.srcObject = null;
//     remoteVideoRef.current.srcObject = null;
//   };

//   const toggleCameraHandler = () => {
//     if (isCameraOn) {
//       localStream.getTracks().forEach((track) => track.stop());
//       setLocalStream(null);
//       setIsCameraOn(false);
//       localVideoRef.current.srcObject = null;
//     } else {
//       navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//         .then((stream) => {
//           setLocalStream(stream);
//           localVideoRef.current.srcObject = stream;

//           // Add local stream to peer connection if already established
//           if (peerConnection) {
//             stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
//           }

//           setIsCameraOn(true);
//         })
//         .catch((err) => {
//           console.error('Error accessing media devices:', err);
//         });
//     }
//   };

//   return (
//     <div className='container mx-auto'>
//       <h2>Video Call</h2>
//       <div style={{ display: isCameraOn ? 'block' : 'none' }}>
//         <video ref={localVideoRef} autoPlay muted playsInline></video>
//         <video ref={remoteVideoRef} autoPlay playsInline></video>
//       </div>
//       <div>
//         {!isCameraOn ? (
//           <button onClick={toggleCameraHandler}>Turn Camera On</button>
//         ) : (
//           <button onClick={toggleCameraHandler}>Turn Camera Off</button>
//         )}
//         {isCameraOn && (
//           <button 
//           className='bg-danger px-4 py-2'
//           onClick={stopCallHandler}>Stop Call</button>
//         )}
//         {!isCameraOn && (
//           <button
//           className='bg-white my-10 px-4 py-2'
//           onClick={startCallHandler}>Start Call.......</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoCall;


import React, { useRef, useState } from 'react';

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCallHandler = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      setPeerConnection(pc);

      // Add local stream to peer connection
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      // Handle incoming tracks from remote
      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Handle ICE candidate events
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          // Send ICE candidate to signaling server
        }
      };

      // Handle negotiation needed event (for renegotiation)
      pc.onnegotiationneeded = async () => {
        try {
          await pc.setLocalDescription(await pc.createOffer());
          // Send local description to signaling server
        } catch (err) {
          console.error('Error creating offer:', err);
        }
      };

      setIsCameraOn(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const stopCallHandler = () => {
    if (peerConnection) {
      peerConnection.close();
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    setLocalStream(null);
    setPeerConnection(null);
    setIsCameraOn(false);
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };

  const toggleCameraHandler = () => {
    if (isCameraOn) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
      setIsCameraOn(false);
      localVideoRef.current.srcObject = null;
    } else {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          localVideoRef.current.srcObject = stream;

          // Add local stream to peer connection if already established
          if (peerConnection) {
            stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
          }

          setIsCameraOn(true);
        })
        .catch((err) => {
          console.error('Error accessing media devices:', err);
        });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='text-center'>
        <h2 className='text-3xl mb-4'>Video Call</h2>
        <div style={{ display: isCameraOn ? 'block' : 'none' }}>
          <video ref={localVideoRef} autoPlay muted playsInline className='w-96 h-auto mb-4'></video>
          <video ref={remoteVideoRef} autoPlay playsInline className='w-96 h-auto'></video>
        </div>
        <div className='mt-4'>
          {!isCameraOn ? (
            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mr-4' onClick={toggleCameraHandler}>Start Video Call</button>
          ) : (
            <button className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md mr-4' onClick={toggleCameraHandler}>Stop Video</button>
          )}
          {isCameraOn && (
            <button className='bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-md' onClick={stopCallHandler}>End Call</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;


