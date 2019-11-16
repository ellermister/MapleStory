// @Author Maxcloud of MapleFresh.
package net.sf.odinms.server;

import java.io.*;
import java.util.Iterator;
import net.sf.odinms.provider.MapleData;
import net.sf.odinms.provider.MapleDataProvider;
import net.sf.odinms.provider.MapleDataProviderFactory;

public class CashExtract {

    public CashExtract() {
    }

    public static void main(String args[]) throws FileNotFoundException, IOException {
        File IntegerFile = MapleDataProviderFactory.fileInWZPath("Etc.wz");
        MapleDataProvider IntegerProvider = MapleDataProviderFactory.getDataProvider(IntegerFile);
        MapleData cash = IntegerProvider.getData("Commodity.img");
        String output = args[0];
        File outputDir = new File(output);
        File cashTxt = new File((new StringBuilder()).append(output).append("\\商城.txt").toString());
        outputDir.mkdir();
        cashTxt.createNewFile();
        System.out.println("开始提取 Commodity.img 数据...");
        PrintWriter writer = new PrintWriter(new FileOutputStream(cashTxt));
        MapleData child;
        int countx;
        int genderx;
        int itemx;
        int onsalex;
        int periodx;
        int pricex;
        int priorityx;
        int snx;
        for (Iterator i$ = cash.getChildren().iterator(); i$.hasNext(); writer.println((new StringBuilder()).append("(").append(child.getName()).append(",").append(snx).append(",").append(itemx).append(",").append(countx).append(",").append(pricex).append(",").append(periodx).append(",").append(priorityx).append(",").append(genderx).append(",").append(onsalex).append(")").append(",").toString())) {
            child = (MapleData) i$.next();
            MapleData countData = child.getChildByPath("Count");
            MapleData genderData = child.getChildByPath("Gender");
            MapleData itemData = child.getChildByPath("ItemId");
            MapleData onsaleData = child.getChildByPath("OnSale");
            MapleData periodData = child.getChildByPath("Period");
            MapleData priceData = child.getChildByPath("Price");
            MapleData priorityData = child.getChildByPath("Priority");
            MapleData snData = child.getChildByPath("SN");
            String count = "0";
            countx = Integer.parseInt(count);
            String gender = "0";
            genderx = Integer.parseInt(gender);
            String item = "0";
            itemx = Integer.parseInt(item);
            String onsale = "0";
            onsalex = Integer.parseInt(onsale);
            String period = "0";
            periodx = Integer.parseInt(period);
            String price = "0";
            pricex = Integer.parseInt(price);
            String priority = "0";
            priorityx = Integer.parseInt(priority);
            String sn = "0";
            snx = Integer.parseInt(sn);
            if (countData != null) {
                countx = ((Integer) countData.getData()).intValue();
            }
            if (genderData != null) {
                genderx = ((Integer) genderData.getData()).intValue();
            }
            if (itemData != null) {
                itemx = ((Integer) itemData.getData()).intValue();
            }
            if (onsaleData != null) {
                onsalex = ((Integer) onsaleData.getData()).intValue();
            }
            if (periodData != null) {
                periodx = ((Integer) periodData.getData()).intValue();
            }
            if (priceData != null) {
                pricex = ((Integer) priceData.getData()).intValue();
            }
            if (priorityData != null) {
                priorityx = ((Integer) priorityData.getData()).intValue();
            }
            if (snData != null) {
                snx = ((Integer) snData.getData()).intValue();
            }
        }

        writer.flush();
        writer.close();
        System.out.println("Commodity.img 提取完成.");
    }
}