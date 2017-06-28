package com.janita.common.oss.util.captcha;

import org.patchca.word.RandomWordFactory;

import java.util.Random;

public class WujieAdaptiveRandomWordFactory extends RandomWordFactory {
    protected String wideCharacters;

    public void setWideCharacters(String wideCharacters) {
        this.wideCharacters = wideCharacters;
    }

    public WujieAdaptiveRandomWordFactory() {
        this.characters = "abcsdefghjkmnpuvwxyz23456789ABCSDEFGHJKMNPRTUVWXYZ";
        this.wideCharacters = "mwMW";
        super.maxLength = 6;
        super.minLength = 4;
    }

    public String getNextWord() {
        Random rnd = new Random();
        StringBuffer sb = new StringBuffer();
        StringBuffer chars = new StringBuffer(this.characters);
        int l = this.minLength + (this.maxLength > this.minLength ? rnd.nextInt(this.maxLength - this.minLength) + rnd.nextInt(2) : 0);

        for (int i = 0; i < l; ++i) {
            int j = rnd.nextInt(chars.length());
            char c = chars.charAt(j);
            if (this.wideCharacters.indexOf(c) != -1) {
                for (int k = 0; k < this.wideCharacters.length(); ++k) {
                    int idx = chars.indexOf(String.valueOf(this.wideCharacters.charAt(k)));
                    if (idx != -1) {
                        chars.deleteCharAt(idx);
                    }
                }
            }

            sb.append(c);
        }

        return sb.toString();
    }
}
