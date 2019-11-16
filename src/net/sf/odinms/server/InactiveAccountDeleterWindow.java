package net.sf.odinms.server;

import java.io.CharArrayWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.Locale;
import java.util.Properties;
import javax.swing.JTextArea;
import net.sf.odinms.database.DatabaseConnection;

public class InactiveAccountDeleterWindow extends javax.swing.JFrame {

    Calendar c = Calendar.getInstance();
    boolean deleteConfirmed = false;

    public InactiveAccountDeleterWindow() {

        c.setTimeInMillis(System.currentTimeMillis());
        initComponents();

        InputStreamReader is = null;
        try {
            Properties dbProp = new Properties();
            is = new FileReader("RainOS.properties");
            dbProp.load(is);
            is.close();
            DatabaseConnection.setProps(dbProp);
            DatabaseConnection.getConnection();
        } catch (FileNotFoundException ex) {
            System.out.println("You epic fail. Where is your RainOS.properties file?");
        } catch (IOException ioex) {
            System.out.println("OH NOES. TEH IOEXCEPTION!");
        } finally {
            try {
                is.close();
            } catch (IOException ex) {
            }
        }
    }

    @SuppressWarnings("unchecked")
    private void initComponents() {

        String[] monthStrings = getMonthStrings();
        Month = new javax.swing.JComboBox(monthStrings);
        Day = new javax.swing.JComboBox();
        Year = new javax.swing.JComboBox();
        DeleteStart = new javax.swing.JButton();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        JTextArea ta = new JTextArea();
        TextAreaOutputStream taos = new TextAreaOutputStream(ta, 60);
        PrintStream ps = new PrintStream(taos);
        System.setOut(ps);
        System.setErr(ps);
        jScrollPane1 = new javax.swing.JScrollPane(ta);
        jLabel4 = new javax.swing.JLabel();
        Hour = new javax.swing.JComboBox();
        jLabel5 = new javax.swing.JLabel();
        Minute = new javax.swing.JComboBox();
        Second = new javax.swing.JComboBox();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Inactive Account Deletion");

        initMonths();
        Month.addActionListener(new java.awt.event.ActionListener() {

            public void actionPerformed(java.awt.event.ActionEvent evt) {
                MonthActionPerformed(evt);
            }
        });

        redoDays();
        Day.addActionListener(new java.awt.event.ActionListener() {

            public void actionPerformed(java.awt.event.ActionEvent evt) {
                DayActionPerformed(evt);
            }
        });

        initYears(false);
        Year.addActionListener(new java.awt.event.ActionListener() {

            public void actionPerformed(java.awt.event.ActionEvent evt) {
                YearActionPerformed(evt);
            }
        });

        DeleteStart.setText("Start Delete");
        DeleteStart.addActionListener(new java.awt.event.ActionListener() {

            public void actionPerformed(java.awt.event.ActionEvent evt) {
                DeleteStartActionPerformed(evt);
            }
        });

        jLabel1.setText("Month");

        jLabel2.setText("Day");

        jLabel3.setText("Year");

        jLabel4.setText("Delete all accounts that have not logged on since:");

        initHours();
        Hour.addActionListener(new java.awt.event.ActionListener() {

            public void actionPerformed(java.awt.event.ActionEvent evt) {
                HourActionPerformed(evt);
            }
        });

        jLabel5.setText("Hour");

        initMinutes();
        Minute.addActionListener(new java.awt.event.ActionListener() {

            public void actionPerformed(java.awt.event.ActionEvent evt) {
                MinuteActionPerformed(evt);
            }
        });

        initSeconds();
        Second.addActionListener(new java.awt.event.ActionListener() {

            public void actionPerformed(java.awt.event.ActionEvent evt) {
                SecondActionPerformed(evt);
            }
        });

        jLabel6.setText("Minute");

        jLabel7.setText("Second");

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 615, Short.MAX_VALUE).addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup().addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(Month, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(jLabel1)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(Day, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(jLabel2)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jLabel3).addComponent(Year, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)).addGap(18, 18, 18).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jLabel5).addComponent(Hour, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)).addGap(20, 20, 20).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jLabel6).addComponent(Minute, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addComponent(jLabel7).addGap(236, 236, 236).addComponent(DeleteStart)).addComponent(Second, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))).addComponent(jLabel4)).addContainerGap()));
        layout.setVerticalGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout.createSequentialGroup().addContainerGap().addComponent(jLabel4).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(DeleteStart).addComponent(jLabel1).addComponent(jLabel2).addComponent(jLabel3).addComponent(jLabel6).addComponent(jLabel7).addComponent(jLabel5)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(Month, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Day, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Year, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Minute, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Hour, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addComponent(Second, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 382, Short.MAX_VALUE).addContainerGap()));

        pack();
    }

    private void MonthActionPerformed(java.awt.event.ActionEvent evt) {
        c.set(Calendar.MONTH, Month.getSelectedIndex());
        redoDays();
        deleteConfirmed = false;
    }

    private void DeleteStartActionPerformed(java.awt.event.ActionEvent evt) {
        if (deleteConfirmed) {
            deleteConfirmed = !deleteConfirmed;
            Connection con = DatabaseConnection.getConnection();
            PreparedStatement ps = null;
            ResultSet rs = null;
            ArrayList<Integer> accountIDs = new ArrayList<Integer>();
            try {
                ps = con.prepareStatement("SELECT id FROM accounts WHERE lastlogin < ?");
                ps.setTimestamp(1, new Timestamp(c.getTimeInMillis()));
                rs = ps.executeQuery();
                while (rs.next()) {
                    accountIDs.add(rs.getInt("id"));
                }
            } catch (SQLException ex) {
            } finally {
                try {
                    ps.close();
                } catch (SQLException se) {
                }
            }
            System.out.println("Inactive Accounts found: " + accountIDs.size());

            int charsDeleted = 0;
            try {
                ps = con.prepareStatement("DELETE FROM characters WHERE accountid = ?");
                for (Integer accID : accountIDs) {
                    ps.setInt(1, accID);
                    ps.addBatch();
                }
                int[] results = ps.executeBatch();
                for (int i : results) {
                    charsDeleted += i;
                }
            } catch (SQLException ex) {
            } finally {
                try {
                    ps.close();
                } catch (SQLException se) {
                }
            }
            System.out.println("Characters Deleted: " + charsDeleted);

            int accountsDeleted = 0;
            try {
                ps = con.prepareStatement("DELETE FROM accounts WHERE id = ?");
                for (Integer accID : accountIDs) {
                    ps.setInt(1, accID);
                    ps.addBatch();
                }
                int[] results = ps.executeBatch();
                for (int i : results) {
                    accountsDeleted += i;
                }
            } catch (SQLException ex) {
            } finally {
                try {
                    ps.close();
                } catch (SQLException se) {
                }
            }
            System.out.println("Accounts Deleted: " + accountsDeleted);
        } else {
            deleteConfirmed = !deleteConfirmed;
            System.out.println("Deleting all accounts that haven't been accessed since:");
            System.out.println(c.getDisplayName(Calendar.MONTH, Calendar.LONG, Locale.US) + " " + c.get(Calendar.DATE) + ", " + c.get(Calendar.YEAR) +
                    " " + padSingleNumber(c.get(Calendar.HOUR_OF_DAY)) + ":" + padSingleNumber(c.get(Calendar.MINUTE)) + ":" + padSingleNumber(c.get(Calendar.SECOND)));
            System.out.println("Press again to confirm (!!)\r\n");
        }


    }

    private void DayActionPerformed(java.awt.event.ActionEvent evt) {
        c.set(Calendar.DATE, Day.getSelectedIndex() + 1);
        deleteConfirmed = false;
    }

    private void YearActionPerformed(java.awt.event.ActionEvent evt) {
        c.set(Calendar.YEAR, (Integer) Year.getSelectedItem());
        initYears(true);
        deleteConfirmed = false;
    }

    private void MinuteActionPerformed(java.awt.event.ActionEvent evt) {
        c.set(Calendar.MINUTE, (Integer) Minute.getSelectedItem());
        deleteConfirmed = false;
    }

    private void HourActionPerformed(java.awt.event.ActionEvent evt) {
        c.set(Calendar.HOUR, (Integer) Hour.getSelectedItem());
        deleteConfirmed = false;
    }

    private void SecondActionPerformed(java.awt.event.ActionEvent evt) {
        c.set(Calendar.SECOND, (Integer) Second.getSelectedItem());
        deleteConfirmed = false;
    }

    private String padSingleNumber(int i) {
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return "" + i;
        }
    }

    private void initHours() {
        for (int i = 0; i < 24; i++) {
            Hour.addItem(new Integer(i));
        }
        Hour.setSelectedIndex(0);
        c.set(Calendar.HOUR, 0);
    }

    private void initMinutes() {
        for (int i = 0; i < 60; i++) {
            Minute.addItem(new Integer(i));
        }
        Minute.setSelectedIndex(0);
        c.set(Calendar.MINUTE, 0);
    }

    private void initSeconds() {
        for (int i = 0; i < 60; i++) {
            Second.addItem(new Integer(i));
        }
        Second.setSelectedIndex(0);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
    }

    private void initYears(boolean setmid) {
        int year = c.get(Calendar.YEAR) - 25;
        Year.removeAllItems();
        for (int i = 0; i < 50; i++) {
            Year.addItem(new Integer(year++));
        //if (setmid)
        }
        Year.setSelectedIndex(25);
    }

    private void redoDays() {
        int days = 0;
        switch (c.get(Calendar.MONTH)) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                days = 31;
                break;
            case 3:
            case 5:
            case 8:
            case 10:
            case 12:
                days = 30;
                break;
            case 1:
                if (c.get(Calendar.YEAR) % 400 == 0 || (c.get(Calendar.YEAR) % 4 == 0 && c.get(Calendar.YEAR) % 100 != 0)) {
                    days = 29;
                } else {
                    days = 28;
                }
        }
        if (Day.getItemCount() != 0) {
            Day.removeAllItems();
        }
        for (int i = 0; i < days; i++) {
            Day.addItem(new Integer(i + 1));
        }
        try {
            Day.setSelectedIndex(c.get(Calendar.DATE));
        } catch (NullPointerException npe) {
            Day.setSelectedIndex(0);
        } //TryCatch Abuse ^_^;;

    }

    private void initMonths() {
        try {
            Month.setSelectedIndex(c.get(Calendar.MONTH));
        } catch (NullPointerException npe) {
            Month.setSelectedIndex(0);
        } //TryCatch Abuse ^_^;;
    }

    public static void main(String args[]) {
        java.awt.EventQueue.invokeLater(new Runnable() {

            public void run() {
                new InactiveAccountDeleterWindow().setVisible(true);
                System.out.println("Please select a date and hit \"Start Delete\"");
            }
        });
    }
    private javax.swing.JComboBox Day;
    private javax.swing.JButton DeleteStart;
    private javax.swing.JComboBox Hour;
    private javax.swing.JComboBox Minute;
    private javax.swing.JComboBox Month;
    private javax.swing.JComboBox Second;
    private javax.swing.JComboBox Year;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JScrollPane jScrollPane1;

    static protected String[] getMonthStrings() {
        String[] months = new java.text.DateFormatSymbols().getMonths();
        int lastIndex = months.length - 1;

        if (months[lastIndex] == null || months[lastIndex].length() <= 0) { //last item empty
            String[] monthStrings = new String[lastIndex];
            System.arraycopy(months, 0,
                    monthStrings, 0, lastIndex);
            return monthStrings;
        } else { //last item not empty
            return months;
        }
    }
}

class TextAreaOutputStream extends OutputStream {

    private JTextArea textArea;
    private int maxLines;
    private LinkedList lineLengths;
    private int curLength;
    private byte[] oneByte;

    public TextAreaOutputStream(JTextArea ta) {
        this(ta, 1000);
    }

    public TextAreaOutputStream(JTextArea ta, int ml) {
        if (ml < 1) {
            ml = 50;
        }
        textArea = ta;
        maxLines = ml;
        lineLengths = new LinkedList();
        curLength = 0;
        oneByte = new byte[1];
    }

    public synchronized void clear() {
        lineLengths = new LinkedList();
        curLength = 0;
        textArea.setText("");
    }

    public synchronized int getMaximumLines() {
        return maxLines;
    }

    public synchronized void setMaximumLines(int val) {
        maxLines = val;
    }

    @Override
    public void close() {
        if (textArea != null) {
            textArea = null;
            lineLengths = null;
            oneByte = null;
        }
    }

    @Override
    public void flush() {
    }

    public void write(int val) {
        oneByte[0] = (byte) val;
        write(oneByte, 0, 1);
    }

    @Override
    public void write(byte[] ba) {
        write(ba, 0, ba.length);
    }

    @Override
    public synchronized void write(byte[] ba, int str, int len) {
        try {
            curLength += len;
            if (bytesEndWith(ba, str, len, LINE_SEP)) {
                lineLengths.addLast(new Integer(curLength));
                curLength = 0;
                if (lineLengths.size() > maxLines) {
                    textArea.replaceRange(null, 0, ((Integer) lineLengths.removeFirst()).intValue());
                }
            }
            for (int xa = 0; xa < 10; xa++) {
                try {
                    textArea.append(new String(ba, str, len));
                    break;
                } catch (Throwable thr) {                                                 // sometimes throws a java.lang.Error: Interrupted attempt to aquire write lock
                    if (xa == 9) {
                        thr.printStackTrace();
                    } else {
                        Thread.sleep(200);
                    }
                }
            }
        } catch (Throwable thr) {
            CharArrayWriter caw = new CharArrayWriter();
            thr.printStackTrace(new PrintWriter(caw, true));
            textArea.append(System.getProperty("line.separator", "\n"));
            textArea.append(caw.toString());
        }
    }

    private boolean bytesEndWith(byte[] ba, int str, int len, byte[] ew) {
        if (len < LINE_SEP.length) {
            return false;
        }
        for (int xa = 0, xb = (str + len - LINE_SEP.length); xa < LINE_SEP.length; xa++, xb++) {
            if (LINE_SEP[xa] != ba[xb]) {
                return false;
            }
        }
        return true;
    }
    static private byte[] LINE_SEP = System.getProperty("line.separator", "\n").getBytes();
}