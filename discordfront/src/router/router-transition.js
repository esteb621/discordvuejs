import { gsap } from "gsap";

export default {
  methods: {
    async transitionTo(newRoute, oldRoute, done) {
      const tl = gsap.timeline();
      tl.to(oldRoute.container, { duration: 0.3, opacity: 0 });
      tl.to(newRoute.container, { duration: 0.3, opacity: 1 });
      await tl.play();
      done();
    }
  }
};
