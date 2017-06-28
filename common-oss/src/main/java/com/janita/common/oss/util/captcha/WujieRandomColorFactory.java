package com.janita.common.oss.util.captcha;

import org.patchca.color.ColorFactory;

import java.awt.*;
import java.util.List;
import java.util.Random;


/**
 * Created by wuqiang on 16-1-12.
 *
 * @author wuqiang
 */
public class WujieRandomColorFactory implements ColorFactory {
    private List<Color> colorList;
    private static final Random RANDOM = new Random();

    public WujieRandomColorFactory(List<Color> colorList) {
        if (colorList == null || colorList.isEmpty()) {
            throw new IllegalArgumentException("colorList must not be empty.");
        }
        this.colorList = colorList;
    }

    @Override
    public Color getColor(int i) {
        return colorList.get(RANDOM.nextInt(colorList.size()));
    }
}
