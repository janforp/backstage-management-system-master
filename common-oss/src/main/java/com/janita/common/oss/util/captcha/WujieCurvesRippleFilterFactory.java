package com.janita.common.oss.util.captcha;

import org.patchca.color.ColorFactory;
import org.patchca.filter.library.*;
import org.patchca.filter.predefined.RippleFilterFactory;

import java.awt.image.BufferedImageOp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by craig on 16/1/12.        if (extraImageOp != null) {
 */
public class WujieCurvesRippleFilterFactory extends RippleFilterFactory {
    public static final String[] extraImageOpNames = new String[]{
            // "diffuse",
            // "marble",
            "wobble"};
    private static Random random = new Random();
    protected CurvesImageOp curves = new CurvesImageOp();// 随机干扰线
    protected AbstractImageOp extraImageOp;
    protected final DiffuseImageOp diffuse = new DiffuseImageOp();// 字体变形(扩散波文) 笔画扩散
    protected final MarbleImageOp marble = new MarbleImageOp();// 字体变形(大理石纹) 笔画扩散
    protected final WobbleImageOp wobble = new WobbleImageOp();// 字体变形(摆动波纹) 字体扭曲

    public WujieCurvesRippleFilterFactory() {
    }

    public WujieCurvesRippleFilterFactory(ColorFactory colorFactory) {
        this.setColorFactory(colorFactory);
    }

    public WujieCurvesRippleFilterFactory(ColorFactory colorFactory, String extraImageOpName) {
        this(colorFactory);
        if (extraImageOpName != null) {
            switch (extraImageOpName) {
                case "diffuse":
                    this.extraImageOp = diffuse;
                    break;
                case "marble":
                    this.extraImageOp = marble;
                    break;
                case "wobble":
                    this.extraImageOp = wobble;
                    break;
                default:
                    this.extraImageOp = wobble;
            }
        }
    }

    protected List<BufferedImageOp> getPreRippleFilters() {
        ArrayList list = new ArrayList();
        list.add(this.curves);
        if (extraImageOp != null) {
            list.add(extraImageOp);//字体变形和虚化
        }
        return list;
    }

    public void setStrokeMin(float strokeMin) {
        this.curves.setStrokeMin(strokeMin);
    }

    public void setStrokeMax(float strokeMax) {
        this.curves.setStrokeMax(strokeMax);
    }

    public void setColorFactory(ColorFactory colorFactory) {
        this.curves.setColorFactory(colorFactory);
    }

}
