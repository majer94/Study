package diary;

import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.ImageIcon;
import javax.swing.JTextPane;
import java.awt.Font;
import java.awt.Color;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.CharBuffer;
import java.awt.event.ActionEvent;

//Ctrl + Shift + 'F' : 소스코드를 보기 좋게 정렬해주는 기능
//Ctrl + Alt + 화살표(아래) : 한줄 복사 
public class MyDiary extends JFrame {
	private JTextField tf_no;
	private JTextField tf_title;

	public MyDiary() {
		getContentPane().setLayout(null);

		JLabel lb_image = new JLabel("");
		lb_image.setIcon(new ImageIcon("C:\\Users\\pc\\Desktop\\title.png"));
		lb_image.setBounds(12, 10, 410, 89);
		getContentPane().add(lb_image);

		JLabel lb_no = new JLabel("번호");
		lb_no.setBounds(22, 114, 57, 15);
		getContentPane().add(lb_no);

		tf_no = new JTextField();
		tf_no.setBounds(63, 112, 81, 21);
		getContentPane().add(tf_no);
		tf_no.setColumns(10);

		JLabel lb_title = new JLabel("제목");
		lb_title.setBounds(22, 143, 57, 15);
		getContentPane().add(lb_title);

		tf_title = new JTextField();
		tf_title.setBounds(63, 140, 236, 21);
		getContentPane().add(tf_title);
		tf_title.setColumns(10);

		JLabel lb_story = new JLabel("내용");
		lb_story.setBounds(22, 168, 57, 15);
		getContentPane().add(lb_story);

		JTextPane tp_story = new JTextPane();
		tp_story.setForeground(Color.YELLOW);
		tp_story.setBounds(63, 168, 345, 147);
		getContentPane().add(tp_story);

		JButton bt_read = new JButton("읽어오기");
		bt_read.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent arg0) {
				// tf_no 변수를 이용하여 다이어리 파일을 읽어온다.
				String path;

				path = "C:/diary/" + tf_no.getText() + ".txt";
				try {

					FileReader fr = new FileReader(path);
					BufferedReader br = new BufferedReader(fr);

					String line;
					String t_story;
					String ls = System.getProperty("line.separator");
					StringBuilder sb = new StringBuilder();

					tf_no.setText(br.readLine());
					tf_title.setText(br.readLine());

					while ((line = br.readLine()) != null) {
						sb.append(line);
						sb.append(ls);
					}

					tp_story.setText(sb.toString());

				} catch (FileNotFoundException e) {

					JOptionPane.showMessageDialog(rootPane, "파일이 존재하지 않습니다.");
					e.printStackTrace();

				} catch (IOException e) {

					JOptionPane.showMessageDialog(rootPane, "파일 열기에 오류가 발생했습니다.");
					e.printStackTrace();

				}

				// 제목과 내용을 화면에 보여준다.

			}
		});

		bt_read.setForeground(Color.BLUE);
		bt_read.setFont(new Font("굴림", Font.ITALIC, 12));
		bt_read.setBounds(244, 325, 81, 23);
		getContentPane().add(bt_read);

		JButton bt_save = new JButton("저장하기");
		bt_save.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				// tf_no 변수의 값으로 파일을 만들어서 제목과 내용을 저장한다.
				String path;
				String ls = System.getProperty("line.separator");

				path = "C:/diary/" + tf_no.getText() + ".txt";
				try {

					FileWriter fw = new FileWriter(path);

					fw.write(tf_no.getText() + ls);
					fw.write(tf_title.getText() + ls);
					fw.write(tp_story.getText() + ls);
					fw.flush();
					fw.close();

					JOptionPane.showMessageDialog(rootPane, "정상적으로 저장되었습니다.");

					tf_no.setText("");
					tf_title.setText("");
					tp_story.setText("");

				} catch (IOException e1) {

					JOptionPane.showMessageDialog(rootPane, "파일 저장시 오류가 발생했습니다.");
					e1.printStackTrace();

				}
			}
		});
		bt_save.setForeground(Color.RED);
		bt_save.setFont(new Font("굴림", Font.ITALIC, 12));
		bt_save.setBounds(327, 325, 81, 23);
		getContentPane().add(bt_save);

		JButton bt_init = new JButton("초기화");
		bt_init.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				tf_no.setText("");
				tf_title.setText("");
				tp_story.setText("");
			}
		});
		bt_init.setFont(new Font("굴림", Font.ITALIC, 12));
		bt_init.setForeground(Color.ORANGE);
		bt_init.setBackground(Color.DARK_GRAY);
		bt_init.setBounds(63, 325, 81, 23);
		getContentPane().add(bt_init);

		setSize(450, 400);
		setVisible(true);
	}
}
