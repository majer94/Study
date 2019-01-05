package window;

import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;

public class Game2 implements ActionListener{

	JButton s, r, p;
	JFrame f;
	
	public Game2() {
		f = new JFrame();
		f.setTitle("나의 가위 바위 보 게임.");
		f.setSize(500, 1200);
		
		s = new JButton();
		r = new JButton();
		p = new JButton();
		
		ImageIcon icon1 = new ImageIcon("s.png");
		ImageIcon icon2 = new ImageIcon("r.png");
		ImageIcon icon3 = new ImageIcon("p.png");
		
		s.setIcon(icon1);
		r.setIcon(icon2);
		p.setIcon(icon3);
		
		FlowLayout flow = new FlowLayout();
		f.setLayout(flow);
		
		f.add(s);
		f.add(r);
		f.add(p);
		
		//Game2 game = new Game2();
		s.addActionListener(this);
		r.addActionListener(this);
		p.addActionListener(this);
		
		f.setVisible(true);
	}
	
	public static void main(String[] args) {
		Game2 game = new Game2();
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		Random random = new Random();
		int computer = random.nextInt(3);
		
		if(e.getSource() == s) {//내가 가위
			if(computer == 0) { //而컴퓨터가 가위
				f.setTitle("비겼음.");
			}
			if(computer == 1) { // 컴퓨터가 바위
				f.setTitle("컴퓨터가 승리");
			}
			if(computer == 2) { //而컴퓨터가 보
				f.setTitle("내가 승리");
			}
		}
		
		if(e.getSource() == r) {//내가 바위
			
		}
		if(e.getSource() == p) {//내가 보
			
		}
		
		
		
		
		
		
		
		
		
		
	}

}
