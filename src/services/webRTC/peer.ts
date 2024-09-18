'use client'

class PeerService {
    private peer?: RTCPeerConnection;
    constructor(){
        if(!this.peer){
               this.peer = new RTCPeerConnection({
                iceServers:[
                    {
                        urls:[
                            'stun:stun.l.google.com:19302',
                             'stun:global.stun.twilio.com:3478'
                        ] 
                    }
                ]
               }) 
        }
    }

    async  getOffer(){
        if(this.peer){
            const offer = await this.peer.createOffer();
            console.log(offer);
            this.peer.setLocalDescription(new RTCSessionDescription(offer));
               return offer;
        }
          
     }
    async  setRemoteDescription(ans:any){
        if(this.peer){
          await  this.peer.setRemoteDescription(new RTCSessionDescription(ans))
        }
     }
    async getAnswer(offer:any){
                if(this.peer){
                  await  this.peer.setRemoteDescription(new RTCSessionDescription(offer));

                  const answer = await this.peer.createAnswer();

                  await this.peer.setLocalDescription(new RTCSessionDescription(answer));
                    
                  return answer;
                }
     }
}
export default new PeerService();