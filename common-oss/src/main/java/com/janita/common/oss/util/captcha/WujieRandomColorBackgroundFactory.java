package com.janita.common.oss.util.captcha;

import org.patchca.background.BackgroundFactory;
import org.patchca.color.ColorFactory;

import java.awt.*;
import java.awt.image.BufferedImage;

/**
 * Created by craig on 16/1/12.
 */
public class WujieRandomColorBackgroundFactory implements BackgroundFactory {
    private ColorFactory colorFactory;

    public WujieRandomColorBackgroundFactory(java.util.List<Color> colorList) {
        WujieRandomColorFactory scf = new WujieRandomColorFactory(colorList);
        this.colorFactory = scf;
    }

    public void setColorFactory(ColorFactory colorFactory) {
        this.colorFactory = colorFactory;
    }

    public void fillBackground(BufferedImage dest) {
        Graphics g = dest.getGraphics();
        g.setColor(this.colorFactory.getColor(0));
        g.fillRect(0, 0, dest.getWidth(), dest.getHeight());
    }
}
