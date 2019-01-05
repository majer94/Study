package window;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Frame;
import java.awt.event.ActionEvent;
import java.util.Scanner;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class MyShop {
	
	static JLabel 		l1, l2, result;
	static JTextField	t1, t2;
	static JButton 		add, sub, mul, div;
	static JButton 		cbt;
		
	public	MyShop() {
		
		int		num		= 0;
		int		price	= 5000;
		int		sum		= 0;
		
		JFrame f = new JFrame();
		f.setTitle("My Shop");
		f.setSize(250, 380);
			
		l1 = new JLabel("인원수 ");
		l2 = new JLabel("갯수 ");
		
		result = new JLabel("X");
		Font font = new Font("궁서", Font.BOLD, 30);
		result.setFont(font);
			
		t1 = new JTextField(15);
		t2 = new JTextField(15);
		
		t1.setForeground(Color.RED);
		t2.setBackground(Color.ORANGE);
			
		cbt = new JButton("계산하기");
		//sub = new JButton(" 빼  기");
		//mul = new JButton(" 곱하기 ");
		//div = new JButton(" 나누기 ");
		
		cbt.setForeground(Color.BLUE);
		cbt.setBackground(Color.YELLOW);
			
			
		FlowLayout flow = new FlowLayout();
		f.setLayout(flow);
			
		f.add(l1); 
		f.add(t1);
		f.add(l2); 
		f.add(t2);
		f.add(cbt);
		
		f.add(result);
			
		cbt.addActionListener(this);
		
		f.setVisible(true);
	}
	
	public static void main(String[] args) {
		myShop	 = new m();
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		String n1 = t1.getText();
		String n2 = t2.getText();
			
		int num1 = Integer.parseInt(n1);
		int num2 = Integer.parseInt(n2);
			
		int	res;
				
		Cal cal = new Cal();
				
		res = cal.mul(num1, num2);
				
		result.setText("내실 금액은 " + res);
			
	}
		

		
}