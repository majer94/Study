package window;

import java.awt.Color;
import java.awt.FlowLayout;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class MyOrder {
	
	JFrame 		f;
	JButton 	b1, b2, b3;
	JLabel 		l1, l2;
	JTextField 	t1, t2;
	JButton 	ib;
	ImageIcon	img;
	//JPanel		ip;
	
	public	MyOrder() {
		f = new JFrame("주문하세요");
		f.setSize(480, 400);
		//f.setBackground(Color.pink);
		f.setForeground(Color.pink);
		
		b1 = new JButton("짬뽕");
		b1.setBackground(Color.yellow);
		
		b2 = new JButton("우동");
		b2.setBackground(Color.yellow);
		
		b3 = new JButton("자장");
		b3.setBackground(Color.yellow);
		
		l1 = new JLabel("개수");
		l2 = new JLabel("금액");
		
		t1 = new JTextField(5);
		t2 = new JTextField(10);
		
		ib	= new JButton();
		img = new ImageIcon("m1.png");
		ib.setIcon(img);
		
		f.setLayout(new FlowLayout());
		
		f.add(b1);
		f.add(b2);
		f.add(b3);
		
		f.add(l1);
		f.add(t1);
		
		f.add(l2);
		f.add(t2);
		
		f.add(ib);
		
		b1.addAction
		
		
		f.setVisible(true);
	}
	
	
	public static void main(String[] args) {

		MyOrder myo = new MyOrder();

	}
	
	

}
