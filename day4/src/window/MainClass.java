package window;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class MainClass implements ActionListener {

	static JLabel me;
	static JButton b1, b2, b3, b4;

	public static void main(String[] args) {
		JFrame f = new JFrame();
		f.setTitle("나의 그래픽 프로그램 모음");
		f.setSize(300, 300);

		me = new JLabel("임아무개의 그래픽");
		b1 = new JButton("<<<<< 나의 계산기 >>>>");
		b2 = new JButton("<<<<< 나의 이미지 >>>>");
		b3 = new JButton("<<<<< 이미지 변신 >>>>");
		b4 = new JButton("<<<<< 가위바위보 게임 >>>>");
		
		FlowLayout flow = new FlowLayout();
		f.setLayout(flow);
		
		f.add(me); 		f.add(b1);		f.add(b2);		f.add(b3);		f.add(b4);
		
		MainClass main = new MainClass();
		b1.addActionListener(main);
		b2.addActionListener(main);
		b3.addActionListener(main);
		b4.addActionListener(main);
		
		
		f.setVisible(true);
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		
		if(e.getSource() == b1) {
			MyCalculator cal = new MyCalculator();
		}
		if(e.getSource() == b2) {
			MyPicture pic1 = new MyPicture();
		}
		if(e.getSource() == b3) {
			MyPicture2 pic2 = new MyPicture2();
		}
		if(e.getSource() == b4) {
			Game2 game = new Game2();
		}
	}
}
