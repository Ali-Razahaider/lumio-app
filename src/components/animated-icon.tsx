import * as SplashScreen from "expo-splash-screen";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, Keyframe } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { BrandLoader } from "@/components/brand/brand-loader";

const DURATION = 700;

export function AnimatedSplashOverlay() {
   const [animate, setAnimate] = useState(false);
   const [visible, setVisible] = useState(true);

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
            <Text style={styles.caption}>A quiet place to read</Text>
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
                  scheduleOnRN(setVisible, false);
               }
            })}
         style={styles.splashOverlay}
      >
         {loader}
      </Animated.View>
   ) : (
      <View
         onLayout={() => {
            SplashScreen.hideAsync().finally(() => {
               setAnimate(true);
            });
         }}
         style={styles.splashOverlay}
      >
         {loader}
      </View>
   );
}

const styles = StyleSheet.create({
   splashOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "#0D1726",
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
      alignItems: "center",
   },
   caption: {
      marginTop: 18,
      color: "rgba(244, 247, 251, 0.72)",
      fontFamily: "Sora-Regular",
      fontSize: 12,
      letterSpacing: 0.4,
   },
});
