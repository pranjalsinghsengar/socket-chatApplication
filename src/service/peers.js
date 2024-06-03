class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      this.peer.onicecandidate = (event) => {
        if (event.candidate) {
          console.log(event.candidate);
        }
      };
    }
  }

  async getAnswer(offer) {
    if(this.peer){
        await this.peer.setRemoteDescription(offer);
        const answer = await this.peer.createAnswer()
        await this.peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer
    }
  }
  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
    return offer
    }
  }
}

export default new PeerService()