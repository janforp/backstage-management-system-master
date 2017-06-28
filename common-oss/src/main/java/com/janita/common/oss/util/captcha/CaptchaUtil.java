package com.janita.common.oss.util.captcha;

import org.patchca.background.SingleColorBackgroundFactory;
import org.patchca.color.SingleColorFactory;
import org.patchca.font.RandomFontFactory;
import org.patchca.service.CaptchaService;
import org.patchca.service.ConfigurableCaptchaService;

import java.awt.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * Created by wuqiang on 15-12-30.
 *
 * @author wuqiang
 */
public class CaptchaUtil {
    private static final Random random = new Random();
    private static List<ConfigurableCaptchaService> captchaServiceList = new ArrayList<>();
    private static Color[] frontColors = new Color[]{
            Color.BLACK, Color.DARK_GRAY, Color.GRAY, Color.PINK, Color.BLUE,
            Color.ORANGE, Color.MAGENTA,
            new Color(25, 60, 170),
            new Color(0, 0, 102),
            new Color(102, 102, 102),
            new Color(187, 187, 187),
            new Color(170, 170, 170),
            new Color(204, 204, 255),
            new Color(204, 153, 204),
            new Color(204, 153, 153)};// 前景色
    private static Color[] backgroundColors = new Color[]{
            Color.WHITE,
            new Color(245, 245, 245),
            new Color(231, 231, 231),
            new Color(238, 238, 238)};// 背景色

    static {
        int width = 115;
        int height = 50;
        RandomFontFactory fontFactory = new RandomFontFactory(new String[]{"Verdana", "Tahoma", "Helvetica", "Arial", "sans-serif"});
        fontFactory.setRandomStyle(true);
        fontFactory.setMinSize(32);
        fontFactory.setMaxSize(40);
        {
            for (Color backgroundColor : backgroundColors) {
                for (String extraImageOpName : WujieCurvesRippleFilterFactory.extraImageOpNames) {
                    WujieAdaptiveRandomWordFactory wordFactory = new WujieAdaptiveRandomWordFactory();
                    wordFactory.setMinLength(4);
                    wordFactory.setMaxLength(4);
                    ConfigurableCaptchaService captchaService = new ConfigurableCaptchaService();
                    captchaService.setWidth(width);
                    captchaService.setHeight(height);
                    captchaService.setColorFactory(new WujieRandomColorFactory(Arrays.asList(frontColors)));  // 字体颜色
                    captchaService.setBackgroundFactory(new SingleColorBackgroundFactory(backgroundColor));  // 背景颜色
                    captchaService.setFilterFactory(new WujieCurvesRippleFilterFactory(new SingleColorFactory(backgroundColor), extraImageOpName)); // 干扰线
                    captchaService.setWordFactory(wordFactory);   // 词库
                    captchaService.setFontFactory(fontFactory); // 字体配置
                    captchaServiceList.add(captchaService);
                }
            }
        }
    }

    private static <T> T getRandomObjAndRemove(List<T> list) {
        if (list == null || list.isEmpty()) {
            return null;
        }
        int index = random.nextInt(list.size());
        T obj = list.get(index);
        list.remove(index);
        return obj;
    }

    public static CaptchaService getRandomCaptchaService() {
        return captchaServiceList.get(random.nextInt(captchaServiceList.size()));
    }
}
