package window;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Date;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

public class MyAge {
	
	JFrame	f;
	JLabel	tlb, nlb, blb, alb, result;
	JButton	cbt;
	JTextField 	ntf, btf, atf;
	
	
	public	MyAge() {

		JFrame f = new JFrame();
		f.setTitle("My Shop");
		f.setSize(240, 200);
			
		tlb = new JLabel("<<<<< 성인인증 프로그램 >>>>>>");
		nlb = new JLabel("이름");
		blb = new JLabel("생년");
		alb	= new JLabel("나이");
		result = new JLabel();
		
		cbt	= new JButton("확인");
		//l1 = new JLabel("인원수 ");
		//l2 = new JLabel("갯수 ");
		
		//result = new JLabel("X");
		Font font = new Font("궁서", Font.BOLD, 30);
		//result.setFont(font);
			
		ntf = new JTextField(15);
		btf = new JTextField(15); 
		atf = new JTextField(15);
		
		
		
		//t1.setForeground(Color.RED);
		//t2.setBackground(Color.ORANGE);
			
		//cbt = new JButton("계산하기");
		//sub = new JButton(" 빼  기");
		//mul = new JButton(" 곱하기 ");
		//div = new JButton(" 나누기 ");
		
		//cbt.setForeground(Color.BLUE);
		//cbt.setBackground(Color.YELLOW);
			
			
		FlowLayout flow = new FlowLayout();
		f.setLayout(flow);
			
		f.add(tlb); 
		
		f.add(nlb);
		f.add(ntf);
		
		f.add(blb);
		f.add(btf);
		
		f.add(alb);
		f.add(atf);
		f.add(cbt);
		
		f.add(result);
		
				
		cbt.addActionListener(new ActionListener() {
			
			public void actionPerformed(ActionEvent e) {
				String 	name = ntf.getText();
				int		birth = Integer.parseInt(btf.getText());
				int		age	  = 2019 - birth + 1;
				
z				atf.setText(age + "");
				if(age >= 19) {
					result.setText(name + "님은 성년입니다.");	
				} else {
					result.setText(name + "님은 미성년자입니다.");
				}
				
			}
		});
		//f.add(result);
			
		//cbt.addActionListener(this);
		
		f.setVisible(true);
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		MyAge myage = new MyAge();
	}

}
