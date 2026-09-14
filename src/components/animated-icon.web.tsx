import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, Keyframe } from "react-native-reanimated";

import { BrandLoader } from "@/components/brand/brand-loader";

const DURATION = 700;

export function AnimatedSplashOverlay() {
   const [animate, setAnimate] = useState(false);
   const [visible, setVisible] = useState(true);

   useEffect(() => {
      if (!visible) return;
      const timer = setTimeout(() => setAnimate(true), 800);
      return () => clearTimeout(timer);
   }, [visible]);

   if (!visible) return null;

   const splashKeyframe = new Keyframe({
      0: {
         opacity: 1,
         transform: [{ scale: 1 }],
      },
      55: {
         opacity: 1,
         transform: [{ scale: 1 }],
      },
      100: {
         opacity: 0,
         transform: [{ scale: 1.05 }],
         easing: Easing.out(Easing.cubic),
      },
   });

   const loader = (
      <View style={styles.content}>
         <View style={styles.loader}>
            <BrandLoader light size={112} />
         </View>
      </View>
   );

   return animate ? (
      <Animated.View
         entering={splashKeyframe
            .duration(DURATION)
            .withCallback((finished) => {
               "worklet";
               if (finished) {
                  setVisible(false);
               }
            })}
         style={styles.splashOverlay}
      >
         {loader}
      </Animated.View>
   ) : (
      <View style={styles.splashOverlay}>{loader}</View>
   );
}

const styles = StyleSheet.create({
   splashOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "#208AEF",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
   },
   content: {
      alignItems: "center",
      justifyContent: "center",
   },
   loader: {
      zIndex: 1,
   },
});
